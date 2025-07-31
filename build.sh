cp ./index.html ./myapp/www
cp ./script.js ./myapp/www
cp ./styles.css ./myapp/www

curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"
sdk install gradle

cd myapp
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export GRADLE_HOME=$HOME/gradle/gradle-8.2
export PATH=$PATH:$GRADLE_HOME/bin
cordova clean android
cordova build android 

