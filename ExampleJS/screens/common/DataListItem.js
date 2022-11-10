import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

const DataListItem = ({
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
}) => {
  return (
    <View style={styles.column}>
      <View style={styles.dataRow}>
        <Text style={styles.subtitle}>{topLeft}</Text>
        <Text style={styles.subtitle}>{topRight}</Text>
      </View>

      <View style={styles.dataRow}>
        <Text style={styles.subtitle}>{bottomLeft}</Text>
        <Text style={styles.subtitle}>{bottomRight}</Text>
      </View>
    </View>
  );
};

export default DataListItem;
