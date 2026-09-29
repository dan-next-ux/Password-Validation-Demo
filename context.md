# Figma MCP Context

Follow these rules when generating a screen unless explicitly instructed otherwise.

## 1. Design Tokens / Variables
Where possible, match styles from the Figma MCP design to the variable names located in:

/styles/Next_Revision.vars.css

Rules:
- Use existing variables instead of hard-coded values.
- If a matching variable does not exist, select the closest semantic variable rather than creating a new one.
- Do not introduce new design tokens unless explicitly requested.

## 2. Layout and Breakpoints
Unless otherwise specified:

- Assume the design is for **mobile-first layout**.
- All primary containers should span **100% width of the viewport**.
- The content container should have:
  - `max-width: 768px`
  - `margin-left: auto`
  - `margin-right: auto`
- Internal layout should use flexbox unless grid is clearly required by the design.

## 3. Icons and SVG Assets
When an icon is used:

- Export the SVG.
- Place the file in `/images/`.
- Reference the SVG from the prototype rather than embedding inline unless animation or styling requires inline SVG.

Naming convention:
/images/icon-[name].svg

Example:
/images/icon-search.svg
/images/icon-arrow-right.svg

## 4. Component Structure
- Use semantic HTML elements where appropriate (`button`, `nav`, `header`, `main`, `section`).
- Avoid unnecessary wrapper divs.
- Components should be reusable where possible.

## 5. Typography
- Map text styles to the closest matching variables from `/styles/Next_Revision.vars.css`.
- Avoid inline font styles.

## 6. Fallback Behaviour
If the design specification is unclear:

1. Prioritise matching the visual layout from the Figma MCP design.
2. Follow existing variable and spacing conventions.
3. Prefer consistency with existing patterns in `/styles/Next_Revision.vars.css`.