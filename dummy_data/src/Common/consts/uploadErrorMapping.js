"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getErrorMapping = (code) => {
    const uploadErrorMapping = {
        UnauthorizedFileType: {
            libelle: 'Format de fichier non pris en compte',
            description: 'Changer le format de votre fichier et veuillez le déposer de nouveau. Format pris en compte:' +
                'Jpeg, Png, Pdf, Doc, Xls, Zip, Rar, Xml'
        },
        FileEmpty: {
            libelle: 'Taille du fichier trop petit',
            description: 'Le fichier actuel est vide, veuillez déposer de nouveau un fichier non vide.'
        },
        UnauthorizedCharFileName: {
            libelle: 'Caractères interdits dans le nom du fichier',
            description: 'Enlever les caractères interdits du nom de votre fichier et veuillez le déposer de nouveau.' +
                'Caractères non pris en compte: "«", "*", ":", "<", ">", "?", "/", "\\", "|"'
        },
        InternalServerError: {
            libelle: 'Connexion avec le serveur interrompu temporairement',
            description: 'Un problème est survenu. Veuillez réessayer de déposer votre fichier plus tard.'
        },
        UnauthorizedFolder: {
            libelle: 'Emplacement non autorisé',
            description: 'Vous n’avez pas l’autorisation de déposer des fichiers dans cet emplacement.' +
                ' Veuillez déposer votre fichier de nouveau et sélectionner un nouvel emplacement'
        },
        CanceledUpload: {
            libelle: 'Dépôt du fichier abandonné',
            description: 'Vous avez annulé le dépôt du dossier. Vous pouvez recommencer à tout moment.'
        }
    };
    return uploadErrorMapping[code]
        ? uploadErrorMapping[code]
        : uploadErrorMapping['InternalServerError'];
};
exports.default = getErrorMapping;
//# sourceMappingURL=uploadErrorMapping.js.map