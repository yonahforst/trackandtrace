import React from 'react';

import {
  View,
  StyleSheet,
  Image,
} from 'react-native'

import { 
  Avatar, 
  Button, 
  Card, 
  Title, 
  Paragraph,
  Headline,
} from 'react-native-paper';

import i18n from 'i18n-js'
import NavigationBar from '../../components/NavigationBar'

export default ({
  onPrev,
  onNext,
}) => (
  <View
  style={styles.container}>
    <Image
    style={styles.image}
    resizeMode='contain'
    source={require('../../assets/images/008-virus-1.png')}
    />
    <View
    style={styles.innerContainer}>

    
      <Title 
      style={styles.title}>
        { i18n.t('intro_why_title') }
      </Title>


      <Paragraph
      style={styles.body}>
        { i18n.t('intro_why_body') }
      </Paragraph>

  
    </View>

    <NavigationBar
    onPrev={onPrev}
    onNext={onNext}
    />

  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    maxHeight: 300,
    maxWidth: 300,
    alignSelf: 'center',
  },
  title: {
    fontSize: 25,
  },
  body: {
    fontSize: 15
  }
})