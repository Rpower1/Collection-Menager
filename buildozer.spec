[app]

title = Collection Menager
package.name = CollectionMenager
package.domain = org.Rpower1

log_level = 2

# android.patch = src/patches/SDLActivity.java.patch

# Hiermee kun je custom gradle gebruiken:
android.gradle_dependencies = com.android.tools.build:gradle:4.1.3


# Forceer Java 8 compatibiliteit
android.api = 31
android.minapi = 21
android.ndk_api = 21


source.dir = .

version = 0.1

# Zorg dat dit staat:
source.include_exts = py,json

# Python requirements
requirements = python3==3.10.6,kivy,cython==0.29.19

p4a.branch = master

# Android-specific settings
android.permissions = INTERNET
