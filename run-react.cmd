IF "%1"=="" GOTO
start /wait npm i glob@7.2.0
GOTO run-android

:run-android
npx react-native run-android

:completed
echo Executado...