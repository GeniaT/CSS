A few things that I learned with this layout:

:one: Juts like with parent container in flex, we start by defining the parent container: display: grid;

:two: Use of fractional Unit (fr) to make the css more maintable and avoid playing with 100%/ 6 or something like that. + we can use a fixed size and make the 1fr take the rest of the page.

:three: Implementation of first grid: 1/Defining the grid, 2/defining the rows and cols and their respective size, 3/ giving to the main sections an area names, 4/ give those names to grid-template-area property.

:four: Mix of flexbox and Grid: As a general rule of thumb, it is appropriate to use Grid to layout the overall page layout, and Flexbox for inner UI components.

:five: A flex container can be a grid element and grid element can be a flex container.
