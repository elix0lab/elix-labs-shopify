# ELIX Labs master product template

## Master template

`templates/product.elix.json` is the locked ELIX Labs master product template. It uses the approved Retatrutide structure through `sections/main-product-custom.liquid`, with its visual rules in `assets/section-main-product-custom.css` and behavior in `assets/main-product-custom.js`. The existing default `templates/product.json` remains configured with the same section and Retatrutide content so the approved page does not change.

Do **not** redesign those four files. Their section order, markup, spacing, cards, typography, borders, effects, and responsive breakpoints are the approved product-page system.

## Page composition

The visual page is intentionally kept in one Shopify section so its exact ordering and responsive layout cannot drift:

1. native product media gallery and purchase hero
2. mechanism of action
3. potential research applications
4. included documents and research resources
5. quality assurance and storage/handling
6. FAQ
7. closing trust cards

The section blocks are the template-level fallback content and preserve the original Retatrutide page. Product metafields take precedence where listed below, which lets many products share the same template without Liquid edits.

## Product data

Native Shopify product data supplies the title, price, variants, availability, description in the product record, and all primary/secondary product media (including vial and packaging images). The approved design does not render a separate long-description card; the description remains editable in Shopify without introducing a new visual element.

Create these product metafield definitions under **Settings → Custom data → Products**:

| Namespace and key | Recommended type | Purpose |
| --- | --- | --- |
| `custom.elix_subtitle` | Single-line text | Hero subtitle |
| `custom.elix_category` | Single-line text | Breadcrumb category label |
| `custom.elix_accent_color` | Color | Primary accent |
| `custom.elix_accent_secondary` | Color | Secondary accent |
| `custom.elix_glow_color` | Color | Glow/rule accent |
| `custom.elix_border_color` | Single-line text | Border color; hex, rgb, or rgba |
| `custom.elix_mechanism_image` | File reference (image) | Mechanism-of-action image |
| `custom.elix_badges` | List of `elix_badge` metaobjects | Hero badges |
| `custom.elix_benefits` | List of `elix_content_item` metaobjects | Research applications/benefits |
| `custom.elix_documents` | List of `elix_document` metaobjects | Included resources, certificate, and protocol/research files |
| `custom.elix_faq` | List of `elix_faq_item` metaobjects | FAQ entries |
| `custom.elix_related_products` | List of product references | Reserved product relationship data; use it in product cards/merchandising without changing the locked page |

Recommended metaobject definitions and fields:

- `elix_badge`: `label` (single-line text), `icon` (single-line text).
- `elix_content_item`: `title` (single-line text), `text` (single-line text), `icon` (single-line text).
- `elix_document`: `title` (single-line text), `text` (single-line text), `icon` (single-line text), `link_label` (single-line text), `file` (file reference), and optionally `link` (URL).
- `elix_faq_item`: `question` (single-line text), `answer` (rich text).

Supported icon handles are the values exposed by the section block selectors, including `flask`, `snowflake`, `certificate`, `lock`, `box`, `globe`, `molecule`, `dna`, `clipboard`, `flame`, `drop`, `book`, `dropper`, `shield`, `bottle`, `hand`, and `star`.

Quality/testing claims, scientific content, storage/protocol information, checkout labels, headings, and closing trust statements remain editable as section settings and blocks. Shopify's dynamic-source button can connect compatible settings to additional product metafields if the catalog needs more fields.

## Create a peptide page

1. Create the product and add its title, description, price, variants, and availability.
2. In the product's **Theme template** selector, assign `product.elix`.
3. Add product media in the desired gallery order. Use the featured/first media for the primary vial image; add alternate vial and packaging images afterward.
4. Fill the `custom.elix_*` metafields. Empty product metafields automatically fall back to the master section settings/blocks.
5. If unique section-block content is needed instead of metafields, duplicate `templates/product.elix.json` in the theme editor, assign that duplicate to the product, and edit only settings and blocks—never Liquid or CSS.
6. Preview desktop and mobile before publishing.

## Images

- Main, secondary, vial, and packaging images come from native product media.
- Set `custom.elix_mechanism_image` for each product. Retatrutide falls back to the theme setting referencing `mecha-reta.png`.
- Certificates, document previews, and research files belong in `custom.elix_documents` entries. Upload them to Shopify Files and select them in each metaobject; do not paste fixed CDN URLs into Liquid.
- If an optional metafield image is empty, the Liquid template does not output an image or broken placeholder.

## Colors

Set the four color metafields on the product. They feed the scoped CSS custom properties `--elix-accent-color`, `--elix-accent-secondary`, `--elix-glow-color`, and `--elix-border-color`. When empty, the section uses the approved Retatrutide values (`#a72bff`, `#087dff`, `#ed24bd`, and `rgba(137, 113, 221, .24)`). Colors alter accents only, never structure.

## Text, FAQ, and optional content

- Edit title, price, variants, and media on the product.
- Edit the subtitle and category through product metafields.
- Use benefits/documents/badges/FAQ metaobject lists for repeatable product-specific content; their list order controls display order.
- To hide an individual fallback block, remove it in the theme editor or clear its required title/question. To hide the mechanism section, leave both its product metafield and template image setting empty.
- Do not create empty metaobject entries. The template omits empty optional images and skips blank fallback cards, preventing broken media and placeholder copy.

## Locked files

Do not redesign:

- `templates/product.elix.json`
- `sections/main-product-custom.liquid`
- `assets/section-main-product-custom.css`
- `assets/main-product-custom.js`

Only duplicate/assign the JSON template, update Shopify product data/metafields/metaobjects, and edit section settings or blocks.
