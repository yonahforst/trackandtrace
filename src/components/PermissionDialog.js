import React, {
  useState,
} from 'react'

import {
  Linking,
} from 'react-native'

import { 
  Portal,
  Dialog,
  Button,
  Paragraph,
} from 'react-native-paper';

import i18n from 'i18n-js'

export default ({
  visible,
  title,
  body,
  icon,
  cancelable
}) => {
  const [ hide, setHide ] = useState()
  const onDismiss = () => setHide(true)
  const openSettings = () => Linking.openURL('app-settings:')

  return (
    <Portal>
      <Dialog
        visible={visible && !hide}
        onDismiss={onDismiss}>
        <Dialog.Title>
          { title }
        </Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            { body }
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button 
          onPress={openSettings}>
            { i18n.t('open_settings') }
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}