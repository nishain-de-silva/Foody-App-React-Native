import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import theme from './theme'

export default function TextInput({ errorText, description, ...props }) {
    return (
      <View style={{...props.containerStyle,...styles.container}}>
        {description && !errorText ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
        <Input
          style={{...styles.input,...props.inputStyle}}
          selectionColor={theme.colors.primary}
          underlineColor="transparent"
          mode="outlined"
          {...props}
        />
        
        {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
      </View>
    )
  }
const styles = StyleSheet.create({
    container: {
      // width: '100%',
      marginVertical: 12,
    },
    input: {
      backgroundColor: '#fff',
    },  
    description: {
      fontSize: 13,
      color: theme.colors.secondary,
      paddingBottom: 8,
    },
    error: {
      fontSize: 13,
      color: theme.colors.error,
      paddingTop: 8,
    },
  })