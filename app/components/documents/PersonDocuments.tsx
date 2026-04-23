import React from 'react';
import DocumentsList from './DocumentsList';
import AddDocument from './AddDocument';

const PersonDocuments: React.FC = () => {
    const [refreshToken, setRefreshToken] = React.useState(0);

    return (
        <div>
            <h1>Управление документами</h1>
            <DocumentsList refreshToken={refreshToken} />
            <AddDocument onCreated={() => setRefreshToken((v) => v + 1)} />
        </div>
    );
};

export default PersonDocuments;
