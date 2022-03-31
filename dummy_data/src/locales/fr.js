"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fr = {
    ged: {
        documents: '0 document | 1 document | {count} documents',
        title: 'Mes documents',
        subTitle: `Déposez et accédez à l'ensemble de vos documents en ligne`,
        common: {
            table: {
                headers: {
                    documentName: 'Nom du dossier/document',
                    date: 'Modifié le'
                }
            },
            close: 'Fermer',
            download: 'Télécharger',
            delete: 'Supprimer',
            loading: 'Chargement des dossiers...',
            documentType: 'Type de document',
            from: 'Du',
            to: 'Au',
            search: 'Rechercher',
            reset: 'Réinitialiser',
            goTo: 'Aller vers'
        },
        search: {
            document: {
                certified: 'Certifié',
                treated: 'Traité',
                new: 'Nouveau'
            },
            input: {
                placeholder: 'Rechercher un document ',
                advanced: 'Recherche par filtres'
            },
            arboCard: {
                buttons: {
                    exploreMore: `Tous mes dossiers `
                }
            },
            tabs: {
                label: {
                    all: 'Tous',
                    details: 'Détails',
                    comments: 'Commentaires',
                    download: 'Téléchargements'
                }
            },
            filters: {
                period: {
                    title: 'Afficher les résultats pour :',
                    beginning: 'Début',
                    end: 'Fin'
                },
                certified: {
                    all: 'Tous',
                    onlyCertified: 'Seulement Certifiés',
                    excludeCertified: 'Exclure Certifiés'
                }
            }
        },
        upload: {
            default: {
                title: 'Déposer vos fichiers ici',
                subtitle: 'Documents supportés'
            },
            disabled: {
                title: 'Dépot impossible',
                subtitle: 'Upload en cours'
            },
            uploadModal: {
                cancelError: 'Attention',
                error: 'Une erreur est survenue',
                success: 'Destination du fichier selectionné ',
                uploadAll: 'Déposer tous mes documents dans le dossier'
            }
        },
        activateGed: 'Activer votre GED',
        trash: {
            title: 'Corbeille',
            recentDelete: "Ici, accédez à l'ensemble de vos documents récemment supprimés",
            arboCard: {
                title: 'Corbeille',
                description: `Retrouvez ici l'ensemble des documents supprimés.
Vous pouvez les restaurer ou les archiver.`
            },
            archiveAll: 'Tout archiver',
            archiveIn60Days: 'Les éléments ici seront archivés au bout de 60 jours.',
            restore: {
                confirmation: {
                    title: 'Voulez-vous restaurer ce document ?',
                    description: 'Si vous cliquez sur continuer, le document sélectionné sera restauré.'
                },
                successPopup: {
                    restored: 'Document restauré',
                    goToBtn: 'Aller à destination'
                },
                failedPopup: {
                    title: 'Document non restauré',
                    content: 'Un probléme est survenu durant la restauration de votre document veuillez réessayer plus tard'
                },
                inProgressPopup: {
                    content: 'Restauration en cours | Restauration en cours | Restaurations en cours'
                },
                error: 'Un problème est survenu durant la restauration du documents, merci de réessayer plus tard.'
            }
        },
        dataManipulation: {
            mailtoged: {
                cardText: 'Souhaitez-vous déposer vos documents directement par email ?'
            },
            label: {
                create: 'Créer',
                cancel: 'Annuler'
            },
            create: {
                file: {
                    collab: {
                        description: 
                        // eslint-disable-next-line max-len
                        "Nous avons laissé votre fichier dans le répertoire par défaut de votre GED qui s'appelle { selectedFolderName } et à partir duquel votre collaborateur KPMG pourra traiter votre fichier."
                    }
                },
                folder: {
                    title: 'Entrer un nom de dossier',
                    error: {
                        alreadyExists: 'Un dossier avec le nom {folderName} existe déjà'
                    }
                }
            },
            delete: {
                file: 'Supprimer le document',
                cantDelete: "Vous n'avez pas les droits de supprimer ce document",
                modal: {
                    title: 'Êtes-vous sûr de vouloir supprimer ce fichier ? | Êtes-vous sûr de vouloir supprimer ces { fileCount } fichiers ?',
                    descriptionSyncStatus: 
                    // eslint-disable-next-line max-len
                    'Si vous cliquez sur continuer ce fichier sera envoyé à la corbeille et ne pourra donc pas être traité par votre collaborateur KPMG. | Si vous cliquez sur continuer ces { fileCout } fichiers seront envoyés à la corbeille et ne pourront donc pas être traités par votre collaborateur KPMG.',
                    descriptionSimple: 
                    // eslint-disable-next-line max-len
                    'Si vous cliquez sur continuer ce fichier sera envoyé à la corbeille. | Si vous cliquez sur continuer ces { fileCount } fichiers seront envoyés à la corbeille.'
                }
            },
            upload: {
                documentUploadModal: {
                    activators: {
                        button: 'Déposer mes documents'
                    }
                },
                box: {
                    uploadBox: {
                        title: 'Déposer mes documents',
                        subText: 'Documents supportés : ',
                        disabled: {
                            title: 'Dépot impossible',
                            subtitle: 'Upload en cours'
                        }
                    }
                },
                notification: {
                    failUploadPopup: {
                        btn: 'Voir'
                    },
                    cancelUploadModal: {
                        title: "Interrompre l'envoi de documents en cours ?",
                        CTA: {
                            interrupt: 'Interrompre',
                            cancel: 'Annuler'
                        }
                    }
                }
            },
            mailToGed: {
                Modal: {
                    title: 'Déposez vos documents directement  depuis votre boite mail !',
                    description: 'Déposez vos documents à vos experts KPMG en les envoyant aux adresses emails suivantes',
                    knowMore: 'En savoir plus',
                    buttons: {
                        close: 'Fermer',
                        copyAddress: 'Copier l’adresse',
                        addressCopied: 'Copié !',
                        sendEmail: 'Envoyer un email'
                    }
                }
            }
        },
        drawer: {
            header: {
                title: 'Informations document'
            },
            preview: {
                expand: 'Ouvrir l’aperçu'
            },
            details: {
                creationDate: 'Date de dépôt',
                updatedDate: 'Dernière modification',
                createdby: 'Déposé par',
                documentName: 'Nom du document'
            },
            commentsTab: {
                commentDate: 'Date commentaire'
            },
            downloadTab: {
                description: {
                    part1: 'Ce document numérique est une copie fiable.',
                    part2: 'Ce statut vous permet de vous séparer de la pièce comptable originale papier en toute sérénité'
                },
                date: ' Date d’émission',
                download: 'Télécharger l’original'
            }
        }
    }
};
exports.default = fr;
//# sourceMappingURL=fr.js.map