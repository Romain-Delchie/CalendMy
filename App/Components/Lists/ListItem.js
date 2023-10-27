import { View, Text, StyleSheet, ScrollView, Button, Modal, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../../colors";
import { Entypo } from "@expo/vector-icons";
import { useUser } from '@clerk/clerk-expo'

export default function ListItem({ list }) {
    const { user } = useUser();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [items, setItems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const listItems = [
        {
            id: 1,
            name: "Lait",
            list_id: 1,
            account_id: 1,
            agenda_id: 1,
        },
        {
            id: 2,
            name: "Pain",
            list_id: 1,
            account_id: 2,
            agenda_id: 1,
        },
        {
            id: 3,
            name: "Dentifrice avec de la menthe",
            list_id: 1,
            account_id: 2,
            agenda_id: 1,
        },
        {
            id: 2,
            name: "Pain",
            list_id: 1,
            account_id: 2,
            agenda_id: 1,
        },
        {
            id: 3,
            name: "Dentifrice avec de la menthe",
            list_id: 1,
            account_id: 2,
            agenda_id: 1,
        },
        {
            id: 2,
            name: "Pain",
            list_id: 1,
            account_id: 2,
            agenda_id: 1,
        },
        {
            id: 3,
            name: "Dentifrice avec de la menthe",
            list_id: 1,
            account_id: 2,
            agenda_id: 1,
        },
        {
            id: 2,
            name: "Pain",
            list_id: 1,
            account_id: 2,
            agenda_id: 1,
        },
        {
            id: 3,
            name: "Dentifrice avec de la menthe",
            list_id: 1,
            account_id: 2,
            agenda_id: 1,
        },
        {
            id: 2,
            name: "Pain",
            list_id: 1,
            account_id: 2,
            agenda_id: 1,
        },
        {
            id: 3,
            name: "Dentifrice avec de la menthe",
            list_id: 1,
            account_id: 2,
            agenda_id: 1,
        },
        {
            id: 2,
            name: "Pain",
            list_id: 1,
            account_id: 2,
            agenda_id: 1,
        },
        {
            id: 3,
            name: "Dentifrice avec de la menthe",
            list_id: 1,
            account_id: 2,
            agenda_id: 1,
        },
        {
            id: 2,
            name: "Pain",
            list_id: 1,
            account_id: 2,
            agenda_id: 1,
        },
        {
            id: 3,
            name: "Dentifrice avec de la menthe",
            list_id: 1,
            account_id: 2,
            agenda_id: 1,
        },
        {
            id: 2,
            name: "Pain",
            list_id: 1,
            account_id: 2,
            agenda_id: 1,
        },
        {
            id: 3,
            name: "Dentifrice avec de la menthe",
            list_id: 1,
            account_id: 2,
            agenda_id: 1,
        },
        {
            id: 2,
            name: "Pain",
            list_id: 1,
            account_id: 2,
            agenda_id: 1,
        },
        {
            id: 2,
            name: "Pain",
            list_id: 1,
            account_id: 2,
            agenda_id: 1,
        },
        {
            id: 3,
            name: "peinture",
            list_id: 2,
            account_id: 2,
            agenda_id: 2,
        },
    ];

    useEffect(() => {
        setItems(listItems);
    }, []);

    const styles = StyleSheet.create({
        listTitleContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 20,
            width: 270,
            height: 70,
            backgroundColor: colors.tertiary,
            marginBottom: 30,
            paddingRight: 11,
            position: "absolute",
            borderBottomEndRadius: 10,
            borderTopRightRadius: 10,
            top: 50,
            left: 0,
        },
        listTitle: {
            color: colors.secondary,
            fontSize: 20,
            fontWeight: "bold",
        },
        modalDeleteList: {
            bottom: 0,
            top: 0,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            alignItems: "center",
            justifyContent: "center",
            height: "100%"

        },
        itemContainer: {
            backgroundColor: "lightgrey",
            paddingTop: 150,
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
        },
        item: {
            flexDirection: "row",
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: colors.quaternary,
            borderColor: colors.tertiary,
            borderStyle: "solid",
            borderWidth: 1,
            padding: 10,
            width: 300,
            height: 70,
        },
        addItem: {
            flexDirection: "row",
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: colors.tertiary,
            borderColor: colors.tertiary,
            borderStyle: "solid",
            borderWidth: 1,
            padding: 10,
            width: 300,
            height: 70,
        },
        deleteAllItem: {
            flexDirection: "row",
            borderRadius: 5,
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: colors.secondary,
            borderColor: colors.primary,
            borderStyle: "solid",
            borderWidth: 3,
            padding: 10,
            width: 300,
            height: 70,
            marginBottom: 50,
        },


        textItem: {
            color: colors.secondary,
            fontSize: 15,
            width: 200,
        },
        textItemDelete: {
            color: colors.tertiary,
            fontSize: 15,
            width: 200,
        },
    });

    const handleDeleteItem = (item) => {
        setItems(items.filter((i) => i.id !== item.id));
    };

    const addItem = () => {
        console.log("add item");
    };


    return (
        <ScrollView contentContainerStyle={styles.itemContainer}>
            <View style={styles.listTitleContainer}>
                <Text style={styles.listTitle}>{list.name}</Text>
                <Entypo name="trash" size={24} color={colors.primary} onPress={() => setConfirmDelete(true)} />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={confirmDelete}
                >
                    <View style={styles.modalDeleteList}>
                        <Text>Êtes-vous sûr de vouloir supprimer la liste  ?</Text>
                        <Button title="Oui" onPress={() => handleDeleteList(list)} />
                        <Button title="Non" onPress={() => setConfirmDelete(false)} />
                    </View>
                </Modal>
            </View>
            {items
                .filter((item) => item.list_id === list.id)
                .map((item, index) => (
                    <View key={index} style={styles.item}>
                        <Text style={styles.textItem}>{item.name}</Text>
                        <Entypo
                            onPress={() => handleDeleteItem(item)}
                            name="trash"
                            size={24}
                            color={colors.secondary}
                        />
                    </View>
                ))}
            {listItems.filter((item) => item.list_id === list.id).length === 0 && <Text>Aucun produit dans cette liste</Text>}
            <TouchableOpacity style={styles.addItem} onPress={() => setModalVisible(true)}>
                <Text style={styles.textItem}>Ajouter un produit</Text>
                <Entypo name="plus" size={24} color={colors.secondary} />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={{ backgroundColor: "yellow" }}>
                    <Text>Êtes-vous sûr de vouloir supprimer la liste  ?</Text>
                    <Button title="Oui" onPress={() => handleDeleteList(list)} />
                    <Button title="Non" onPress={() => setConfirmDelete(false)} />
                </View>
            </Modal>
            <TouchableOpacity style={styles.deleteAllItem}>
                <Text style={styles.textItemDelete}>Supprimer tous les produits</Text>
                <Entypo name="trash" size={24} color="black" />
            </TouchableOpacity>
        </ScrollView>
    );
}
