cp -fr ./node_modules/bootstrap-icons/font/fonts ./public/stylesheets
cp -f ./node_modules/bootstrap-icons/font/bootstrap-icons.scss ./scss
sass --watch ./scss:./public/stylesheets
