"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages = {
    folders: {
        delete: {
            modal: {
                title: 'Êtes-vous sûr de vouloir supprimer ce dossier ?',
                description: (folderName) => `Si vous cliquez sur "Continuer", tous les fichiers et sous dossiers à partir du dossier "${folderName}" seront supprimés et envoyés à la corbeille.`
            },
            error: "Vous n'avez pas les droits nécessaires pour supprimer ce dossier"
        },
        create: {
            error: "Ce dossier est en lecture seule. Vous ne bénéficiez pas des droits d'accès à son édition.",
            validationNameWarning: 'Veuillez nommer votre dossier en utilisant des lettres ou des chiffres.'
        }
    },
    documents: {
        delete: {
            modal: {
                title: 'Êtes-vous sûr de vouloir supprimer ce fichier ?',
                description: (syncStatus) => syncStatus
                    ? `Si vous cliquez sur continuer ce fichier sera supprimé et envoyé à la corbeille et ne pourra donc pas être traité par votre collaborateur KPMG.`
                    : `Si vous cliquez sur continuer ce fichier sera supprimé et envoyé à la corbeille.`
            },
            error: "Vous n'avez pas les droits nécessaires pour supprimer ce document"
        }
    },
    search: {
        filters: {
            openButton: 'Recherche avancée'
        }
    },
    uploadBox: {
        active: {
            mainText: 'Déposer vos fichiers ici',
            subText: `Documents supportés: `
        },
        disabled: {
            mainText: 'Dépot impossible',
            subText: 'Upload en cours'
        }
    },
    trash: {
        card: {
            title: 'Corbeille',
            description: "Ici, retrouvez l'ensemble des documents supprimés. Vous pourrez les restaurer ou les archiver."
        }
    }
};
exports.default = {
    messages
};
//# sourceMappingURL=messages.js.map