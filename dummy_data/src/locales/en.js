"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const en = {
    ged: {
        documents: '0 document | 1 document | {count} documents',
        title: 'My documents',
        subTitle: `File and access all your documents online`,
        common: {
            table: {
                headers: {
                    documentName: 'Name',
                    date: 'Updated at'
                }
            },
            close: 'Close',
            download: 'Download',
            delete: 'Delete',
            loading: 'Folders loading...',
            documentType: 'Document type',
            from: 'From',
            to: 'To',
            search: 'Search',
            reset: 'Reset',
            goTo: 'Go to'
        },
        search: {
            document: {
                certified: 'Certified',
                treated: 'Treated',
                new: 'New'
            },
            input: {
                placeholder: 'Find a document ',
                advanced: 'Find with filters'
            },
            arboCard: {
                buttons: {
                    exploreMore: `All my folders `
                }
            },
            tabs: {
                label: {
                    all: 'All',
                    details: 'Details',
                    comments: 'Comments',
                    download: 'Download'
                }
            },
            filters: {
                period: {
                    title: 'Display results during :',
                    beginning: 'Beginning',
                    end: 'End'
                },
                certified: {
                    all: 'All',
                    onlyCertified: 'Only certified',
                    excludeCertified: 'Exclude certified'
                }
            }
        },
        upload: {
            default: {
                title: 'Drop your files here',
                subtitle: 'Supported types'
            },
            disabled: {
                title: 'Disabled',
                subtitle: 'Upload in progress'
            },
            uploadModal: {
                cancelError: 'Warning',
                error: 'An error has occurred',
                uploadAll: 'Put all my documents in the folder',
                success: 'Destination of the selected file'
            }
        },
        activateGed: 'Activate your GED',
        trash: {
            title: 'Trash',
            recentDelete: 'Here you can access all your recently deleted documents',
            arboCard: {
                title: 'Corbeille',
                description: `Retrouvez ici l'ensemble des documents supprimés.
Vous pouvez les restaurer ou les archiver.`
            },
            archiveAll: 'Archive all',
            archiveIn60Days: 'The items here will be archived after 60 days.',
            restore: {
                confirmation: {
                    title: 'Would you like to restore this document ?',
                    description: 'If you click continue then the selected document will be restored.'
                },
                successPopup: {
                    restored: 'Restored document',
                    goToBtn: 'Go to destination'
                },
                failedPopup: {
                    title: 'Document not restored',
                    content: 'A problem occurred during the restoration of your document please try again later.'
                },
                inProgressPopup: {
                    content: 'Restoration in progress | Restoration in progress | Restorations in progress'
                },
                error: 'A problem occurred during the restoration of your document please try again later.'
            }
        },
        dataManipulation: {
            mailtoged: {
                cardText: 'Would you like to submit your documents directly by email?'
            },
            label: {
                create: 'Create',
                cancel: 'Cancel'
            },
            create: {
                file: {
                    collab: {
                        description: 
                        // eslint-disable-next-line max-len
                        'We left your file in your default directory which is called { selectedFolderName } and from which your KPMG employee can process your file.'
                    }
                },
                folder: {
                    title: 'Enter a folder name',
                    error: {
                        alreadyExists: 'A folder with the name {folderName} already exists'
                    }
                }
            },
            delete: {
                file: 'Delete document',
                cantDelete: "You don't have the rights to delete this document",
                modal: {
                    title: 'Are you sure you want to delete this file? Are you sure you want to delete these { fileCount } files?',
                    descriptionSyncStatus: 
                    // eslint-disable-next-line max-len
                    'If you click on continue, the file will be sent to the garbage and cannot be processed by your KPMG employee. | If you click on continue these { fileCount } files will be sent to the garbage and cannot be processed by your KPMG employee.',
                    descriptionSimple: 
                    // eslint-disable-next-line max-len
                    'If you click on continue this file will be sent to the garbage. | If you click on continue these { fileCount } files will be sent to the garbage.'
                }
            },
            upload: {
                documentUploadModal: {
                    activators: {
                        button: 'Submit my documents'
                    }
                },
                box: {
                    uploadBox: {
                        title: 'Submit my documents',
                        subText: 'Supported documents',
                        disabled: {
                            title: 'Unable to submit',
                            subtitle: 'Uploading'
                        }
                    }
                },
                notification: {
                    failUploadPopup: {
                        btn: 'See'
                    },
                    cancelUploadModal: {
                        title: 'Cancel ongoing upload?',
                        CTA: {
                            interrupt: 'Stop',
                            cancel: 'Cancel'
                        }
                    }
                }
            },
            mailToGed: {
                Modal: {
                    title: 'Upload your documents directly from your mailbox!',
                    description: 'Drop your documents to your KPMG experts by sending them to the following email addresses',
                    knowMore: 'Learn more',
                    buttons: {
                        close: 'Close',
                        copyAddress: 'Copy address',
                        addressCopied: 'Copy',
                        sendEmail: 'Send email'
                    }
                }
            }
        },
        drawer: {
            header: {
                title: 'Document information'
            },
            preview: {
                expand: 'Open preview'
            },
            details: {
                creationDate: 'Document created at',
                updatedDate: 'Last modification',
                createdby: 'Source',
                documentName: 'Document name'
            },
            commentsTab: {
                commentDate: 'Comment date'
            },
            downloadTab: {
                description: {
                    part1: 'This digital document is a trusted copy',
                    part2: 'This status allows you to part with the original paper accounting document with peace of mind'
                },
                date: ' Date of issue',
                download: 'Download the original document'
            }
        }
    }
};
exports.default = en;
//# sourceMappingURL=en.js.map