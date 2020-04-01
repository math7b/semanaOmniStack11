import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((incident.value))}`;

    function navigationBack() {
        navigation.goBack();
    }

    function senEmail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhatsapp() {
        linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }

    return (
        <View style={styles.container}>
            <view style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigationBack}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>

                <View style={styles.incident}>
                <View style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</View>
                        <View style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</View>

                        <View style={styles.incidentProperty}>CASO:</View>
                        <View style={styles.incidentValue}>{incident.title}</View>

                        <View style={styles.incidentProperty}>VALOR:</View>
                        <View style={styles.incidentValue}>{
                            Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format((incident.value))}
                        </View>
                </View>

                <View style={styles.contactBox}>
                    <Text style={styles.heroTitle}>Salve o dia!</Text>
                    <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                    <Text style={styles.heroDescription}>Entre em contato:</Text>

                    <View tyle={styles.actions}>
                        <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                            <Text style={styles.actionText}>WhatsApp</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.action} onPress={senEmail}>
                            <Text style={styles.actionText}>E-mail</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </view>
        </View>
    )
}