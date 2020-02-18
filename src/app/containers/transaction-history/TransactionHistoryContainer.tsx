import React from "react";
import { ITransactionHistoryFields } from "../../../contentful/@types/contentful";
import { TransactionHistory } from "../../components/transaction-history/TransactionHistory";
import RichText from "../../elements/rich-text/RichText";

// Add all new contentful containers here.
export default ({ item, ...rest }) => {
    if (!item) return null;

    const {
        caption,
        title,
        description,
        pointsLabel,
        dataIsLoadingMessage,
        noDataMessage,
        loadingErrorMessage,
    } = item.fields as ITransactionHistoryFields;

    const transformedData: TransactionHistory["props"] = {
        caption,
        title,
        description: RichText({ html: description }),
        pointsLabel,
        dataIsLoadingMessage,
        noDataMessage,
        loadingErrorMessage,
    };

    return <TransactionHistory {...rest} {...transformedData} />;
};
