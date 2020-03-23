import React, {
  useState,
} from 'react'

import {
  View, 
  StyleSheet,
  FlatList,
} from 'react-native'

import {
  Card,
  List,
  Button,
  Surface,
  Checkbox,
  TextInput,
  HelperText,
} from 'react-native-paper'

import i18n from 'i18n-js'

export default ({
  referenceNumber='',
  submitReport,
  hasCovid,
  isLoading,
  error,
}) => {
  const [ checked, setChecked ] = useState(hasCovid)
  const [ text, setText ] = useState(referenceNumber)

  const onSubmitReport = () => {
    return submitReport({
      hasCovid: checked,
      referenceNumber: text,
    })
  }

  return (
    <View 
    style={styles.container}>

      <Card>
        <Card.Title
        title={i18n.t('health_form_title')}
        />
        <Card.Content>
        
          <List.Item
          title={i18n.t('health_form_covid_checkbox')}
          left={props => (
            <Checkbox.Android 
            {...props} 
            disabled={isLoading}
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => setChecked(!checked)}
            />
          )}
          />

          {checked && (
            <TextInput 
            style={styles.input}
            label={i18n.t('health_form_reference_number')}
            value={text} 
            disabled={isLoading}
            // mode='outlined'
            onChangeText={setText}
            />
          )}
        </Card.Content>
        
        <Card.Actions
        style={styles.actions}>
          <HelperText
          type="error"
          visble={!!error}>
            {error}
          </HelperText>

          <HelperText
          type="error"
          visble={!!error}>
            {error}
          </HelperText>

          <Button
          onPress={onSubmitReport}
          loading={isLoading}
          disabled={isLoading || !checked || (text && text.length == 0)}
          mode='contained'>
            {i18n.t('health_form_submit')}
          </Button>
        </Card.Actions>

      </Card> 

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  input: {
    margin: 10
  },
  actions: {
    justifyContent: 'flex-end',
  },
})