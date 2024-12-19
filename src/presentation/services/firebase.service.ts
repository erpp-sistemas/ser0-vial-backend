// Importar Firebase Admin
import path from 'path';
import fs from 'fs';
import admin from 'firebase-admin';

// Importar la clave de servicio
const serviceAccountPath = path.resolve('src/config/serviceAccountKey.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));


interface UserCollection {
    isActive: boolean;
    IMEI: string;
    name: string;
    email: string;
    user_id: number
    password: string;
    lastSession: string;
    lastSync: string,
    totalAccounts: number;
    uid: string
}

export class FirebaseService {

    auth: any;
    firestore: any;

    constructor() {
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount)
            });
        }
        this.auth = admin.auth();
        this.firestore = admin.firestore();
    }


    async createUser(email: string, password: string) {
        try {
            const userRecord = await this.auth.createUser({
                email: email,
                password: password
            });
            return userRecord;
        } catch (error: any) {
            console.error('Error al crear usuario:', error.message);
            throw error;
        }
    }



    async createUserDocFirestore(uid: string, userData: UserCollection) {
        return await this.firestore.collection('users').doc(uid).set(userData);
    }

    async getUserDocument(docId: string) {
        try {
            const docRef = this.firestore.collection('users').doc(docId);

            const docSnapshot = await docRef.get();

            if (!docSnapshot.exists) {
                throw new Error(`El documento con ID "${docId}" no existe en la colección users`);
            }
            
            return docSnapshot.data();
        } catch (error: any) {
            console.error('❌ Error al obtener el documento:', error.message);
            throw error;
        }
    }

    async updateUserDocById(user_id: number, dataUpdate: any) {
        try {
            // 1️⃣ Referencia al documento
            const usersRef = this.firestore.collection('users');
            const querySnapshot = await usersRef.where('user_id', '==', user_id).get();
            if (querySnapshot.empty) {
                console.log('No users forund with this email');
                return null;
            }

            const userDoc = querySnapshot.docs[0];
            const userRef = usersRef.doc(userDoc.id);

            await userRef.update(dataUpdate);

        } catch (error: any) {
            console.error('❌ Error al actualizar el documento:', error.message);
            throw error;
        }
    }


}





