import type {
  Msg,
  NatsConnection,
  NatsError,
  Subscription,
} from 'nats.ws'
import { connect } from 'nats.ws'

import { API_WEBSOCKET_URL } from '@/constants/environment.constant'
import { oAuthClient } from '@/libs/oAuth.lib'
import { LoggerUtil } from '@/utils/logger.util.ts'

const NATS_SUBJECT_PREFIX = `template-project`
const NATS_CONNECTION_NAME = 'webapp-client'
const NATS_DEBUG_MODE = false

export class WebSocketService {
  private static instance: WebSocketService | null = null
  private natsConnections: NatsConnection | null = null

  public static getInstance(): WebSocketService {
    if (this.instance === null) {
      this.instance = new WebSocketService()
    }

    return this.instance
  }

  private async getConnection(): Promise<NatsConnection> {
    if (this.natsConnections !== null) {
      return this.natsConnections
    }

    return await this.connect()
  }

  public async connect(): Promise<NatsConnection> {
    const accessToken = await oAuthClient.getAccessToken()

    return await connect({
      name: NATS_CONNECTION_NAME,
      authenticator: () => {
        return {
          auth_token: accessToken,
        }
      },
      debug: NATS_DEBUG_MODE,
      servers: [
        API_WEBSOCKET_URL,
      ],
    })
  }

  public async disconnect(): Promise<void> {
    if (this.natsConnections === null) {
      return
    }

    await this.natsConnections.drain()
    this.natsConnections = null
  }

  public async subscribe<TMessage>(subject: string, callback: (message: TMessage) => void): Promise<Subscription> {
    const connection = await this.getConnection()

    return connection.subscribe(`${NATS_SUBJECT_PREFIX}.${subject}`, {
      callback: (error: NatsError | null, msg: Msg): void => {
        if (error !== null) {
          LoggerUtil.error('[WebSocketService]', error)

          return
        }

        callback(new TextDecoder().decode(msg.data) as TMessage)
      },
    })
  }
}
