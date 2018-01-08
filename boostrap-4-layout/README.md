Having a basis of Boostrap 3, here are 10 things I learned with Ohans Emmanuel tutorial: </br>

:one: Every row is a flex box container

:two: The "d" class is powerfull when using different display based on the size of the screen, ex "d-none d-md-block" will make the col of a row hide by default but will represent it as a block on mid sized screens. Reading those style from the html class is clearer than having the displays written in various snippets in CSS.  

:three: In a similar way, playing with the order of your divs, "order" class is used and works super well with combinations as "order 2 order-md-1" which means the order by default is 2 but will be 1 on mid size screens. 
the col size doesn't have to be defined. 

:four: According to how many cols are in a row, the space will be equally devided for each col in this row. 

:five: The columns can be nested ! 

:six: use of vh unit is usefull when you want to control how the user sees your content on a certain viewport. ex: .class {min-height: 80vh} //at least 80% of the viewport

:seven: use of "<pre>" tag is usually used for computer code but can be used for something else aswell. The spaces and line breaks in this tag are preserved.

:eight: boostrap 4 is built on top of previous versions code, which means your apps won't break if you upgrade to boostrap 4. 

:nine: This build is great when you practiced already without bootstrap and can see how easily can some tricky things be done when playing with responsiveness.

:ten: The amount of custom css is minimal for such a great looking layout, therefore the maintenance is reduced aswell.


