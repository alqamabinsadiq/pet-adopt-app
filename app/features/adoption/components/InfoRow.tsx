import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../../foundation/theme';

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: colors.textMuted,
  },
  infoValue: {
    fontSize: 16,
    color: colors.textDark,
    fontWeight: '600',
  },
});

export default InfoRow;
