import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavegation } from '@react-navigation/naative';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavegation();

    function navigateToDetail(incident) {
        navigation.navidate('Detail', { incident });
    }

    async function loadIncidents() {
        if (loading) {
            return;
        }

        if (total > 0 && incidents.length === total) {
            return;
        }

        setLoading(true);

        const response = await api.get('indidents', {
            params: { page }
        });

        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <view style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </view>
            <Text style={styles.tittle}>Bem vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                data={incidents}
                style={style.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={falze}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <View style={styles.incidentProperty}>ONG:</View>
                        <View style={styles.incidentValue}>{incident.name}</View>

                        <View style={styles.incidentProperty}>CASO:</View>
                        <View style={styles.incidentValue}>{incident.title}</View>

                        <View style={styles.incidentProperty}>VALOR:</View>
                        <View style={styles.incidentValue}>{
                            Intl.NumberFormat('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            }).format((incident.value))}
                        </View>

                        <TouchableOpacity
                            style={styles.detailsButton}
                            onPress={() => navigateToDetail()}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}