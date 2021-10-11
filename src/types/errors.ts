export enum MessageErrors {
    NO_ID_PROVIDED = "no_id_provided",
}

interface ErrorShape {
    title: string;
    description: string;
}

export const MESSAGE_ERROR_MAP: Record<MessageErrors, ErrorShape> = {
    [MessageErrors.NO_ID_PROVIDED]: {
        title: "No ID provided",
        description: "Looks like you forget to add the ID of the document.",
    },
};