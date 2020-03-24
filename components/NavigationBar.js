import React, {
  useState,
} from 'react'

import {
  View,
  StyleSheet,
} from 'react-native'

import { 
  Button 
} from 'react-native-paper'

import i18n from 'i18n-js'

const noop = () => {}

export default ({
  onPrev,
  onNext,
  prevTitle=i18n.t('previous'),
  nextTitle=i18n.t('next'),
}) => (

      <View
      style={styles.buttonsContainer}>
        <Button 
        disabled={!onPrev}
        onPress={onPrev || noop}>
          { prevTitle }
        </Button>

        <Button 
        disabled={!onNext}
        onPress={onNext || noop }>
          { nextTitle }
        </Button>
      </View>
  )

const styles = StyleSheet.create({

  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
})