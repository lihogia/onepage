echo ' [onepage > build.sh] build node_modules ...'
npm install
echo ' [onepage > build.sh] build & convert scss to css files ...'
cp -fr ./node_modules/bootstrap-icons/font/fonts ./public/stylesheets
cp -f ./node_modules/bootstrap-icons/font/bootstrap-icons.scss ./scss
echo ' [onepage > build.sh] calling sass ...'
npx sass ./scss:./public/stylesheets

