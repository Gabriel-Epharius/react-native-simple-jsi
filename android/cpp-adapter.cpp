#include <jni.h>
#include "react-native-simple-jsi.h"

extern "C"
JNIEXPORT jint JNICALL
Java_com_simplejsi_SimpleJsiModule_nativeMultiply(JNIEnv *env, jclass type, jdouble a, jdouble b) {
    return simplejsi::multiply(a, b);
}
