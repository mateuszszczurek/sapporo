# Sapporo Voleyball Toruney App
- [x] up to 8 groups
- [ ] it should not be possible to "Zatwierdź grupę" after doing that once and going back by using back navigation
- [ ] it should not be possible to add team with the same name to a different group. Team name should be unique along all groups
- [ ] cannot add two groups with the same name (!) empty doesn't break uniqueness since it's empty
- [ ] commonize layout and logo for all pages?
- [ ] check for uniqueness - cannot create another toruney with the same name?
- [ ] prettify Submit button handler, need to prevent default, so that question mark is not added to URL
- [ ] border around forms
- [ ] extract style
- [ ] agree on sensible theme
- [ ] check that each page is rendering (in test)
- [ ] fix display name
- [ ] handle case when we go back to create toruney app by back button (block after first creation?)
- [ ] display tourney name after toruney creation
- [ ] on "Dodaj drużynę" - try to make icon with circle and transparent button maybe?
- [ ] extract team as an separate object
- [ ] work out why I need inline style in Group (margin) and why bootstrap doesn't make the space by default
- [ ] add validation states to user inputs
- [ ] save state change in cookies and re-open (?)

How to style react components: https://codeburst.io/4-four-ways-to-style-react-components-ac6f323da822<br/>
Syntax: https://help.github.com/articles/basic-writing-and-formatting-syntax/<br/>
Bootstrap CSS: https://www.w3schools.com/bootstrap/bootstrap_ref_all_classes.asp<br/>
React Boostrap components: https://react-bootstrap.github.io/components/alerts/<br/>