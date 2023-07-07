echo ' [onepage > build.sh] calling ....'
./build.sh
echo ' [onepage > build.sh] finished. Starting with debug ...'
#export PORT=9090
DEBUG=onepage:* npm start