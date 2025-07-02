import type {
  SearchCollectionContactResponse,
  SearchCollectionUserResponse,
} from '@/client'
import { GlobalSearchCollectionName } from '@/client'
import type { ContactUuid } from '@/models/contact/contactUuid.model.ts'
import type { GlobalSearchIndex } from '@/models/global-search/globalSearchIndex.model.ts'
import type { GlobalSearchDto } from '@/models/global-search/globalSearchIndexDto.model.ts'
import type { UserUuid } from '@/models/user/userUuid.model.ts'

export class GlobalSearchCareTransformer {
  static fromDto(dto: GlobalSearchDto): GlobalSearchIndex {
    if (dto.collection === GlobalSearchCollectionName.USER) {
      const entity = dto.entity as SearchCollectionUserResponse

      return {
        entity: {
          uuid: entity.uuid as UserUuid,
          name: entity.name,
          type: GlobalSearchCollectionName.USER,
          meta: null,
        },
        textMatch: dto.text_match,
      }
    }

    if (dto.collection === GlobalSearchCollectionName.CONTACT) {
      const entity = dto.entity as SearchCollectionContactResponse

      return {
        entity: {
          uuid: entity.uuid as ContactUuid,
          name: entity.name,
          type: GlobalSearchCollectionName.CONTACT,
          meta: null,
        },
        textMatch: dto.text_match,
      }
    }

    throw new Error(`Unsupported collection type: ${dto.collection}`)
  }
}
