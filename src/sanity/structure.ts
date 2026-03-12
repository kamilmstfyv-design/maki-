import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Məzmun')
    .items([
      S.listItem()
        .title('Menyu')
        .child(
          S.list()
            .title('Menyu')
            .items([
              S.documentTypeListItem('menuCategory').title('Kateqoriyalar'),
              S.documentTypeListItem('product').title('Məhsullar'),
            ])
        ),
      S.documentTypeListItem('heroSlide').title('Hero slaydlar'),
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() !== 'menuCategory' &&
          item.getId() !== 'product' &&
          item.getId() !== 'heroSlide'
      ),
    ])
