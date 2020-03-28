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

const ListItem = ({
  title,
  checked,
  disabled,
  setChecked,
  ...props
}) => (
  <List.Item
  {...props}
  title={title}
  onPress={() => setChecked(!checked)}
  left={props => 
    <Checkbox.Android 
    {...props} 
    disabled={disabled}
    status={checked ? 'checked' : 'unchecked'}
    onPress={() => setChecked(!checked)}
    />
  }/>
)

export default ({
  submitReport,
  shareConsent,
  symptoms={},
  isLoading,
  error,
}) => {
  const [ consentCheckbox, setConsentCheckbox ] = useState(shareConsent)
  const [ symptomCheckboxes, setSymptomCheckboxes ] = useState(symptoms)

  const onSubmitReport = () => {
    return submitReport({
      consent: consentCheckbox,
      symptoms: symptomCheckboxes,
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
          <List.Section>
            <List.Subheader>
              {i18n.t('health_form_symptoms_header')}
            </List.Subheader>
            <ListItem
            title={i18n.t('fever')}
            checked={symptomCheckboxes['fever']}
            setChecked={fever => setSymptomCheckboxes({
              ...symptomCheckboxes,
              fever
            })}
            />
            <ListItem
            title={i18n.t('cough')}
            checked={symptomCheckboxes['cough']}
            setChecked={cough => setSymptomCheckboxes({
              ...symptomCheckboxes,
              cough
            })}
            />
            <ListItem
            title={i18n.t('breathing')}
            checked={symptomCheckboxes['breathing']}
            setChecked={breathing => setSymptomCheckboxes({
              ...symptomCheckboxes,
              breathing
            })}
            />
          </List.Section>

          <List.Section>
            <List.Subheader>
              {i18n.t('health_form_consent_header')}
            </List.Subheader>

            <ListItem
            title={i18n.t('health_form_consent_checkbox')}
            titleNumberOfLines={2}
            checked={consentCheckbox}
            setChecked={setConsentCheckbox}
            />
          </List.Section>

        </Card.Content>
        
        <Card.Actions
        style={styles.actions}>
          <HelperText
          type="error"
          visble={!!error}>
            {error}
          </HelperText>

          <Button
          onPress={onSubmitReport}
          loading={isLoading}
          disabled={isLoading || !consentCheckbox }
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