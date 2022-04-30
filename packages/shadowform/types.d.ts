declare module "shadowform" {

    type IValidationSync = {
        error: string;
        validate: (value: any, values: any) => boolean;
    }
    
    type IValidationAsync = Omit<IValidationSync, keyof {
        validate: never
    }> & {
        isAsync: true,
        validate: (value: any, values: any) => Promise<boolean>;
    };

    type IValidation = IValidationSync | IValidationAsync;

    interface IField {
        normalize?: (value: any) => any;
        requiredError?: string;
        validations?: Record<string, IValidation>;
        isRequired?: boolean;
        isEmpty?: boolean;
        initialValue?: any;
    }

    interface IFormStoreArgs {
        fields?: Record<string, IField>;
        initialValues?: Record<string, any>;
    }

    interface IFieldStoreArgs extends IField {
        asyncValidations?: any;
        asyncValidationDelay?: any;
        validationErrors?: any;
        form: FormStore;
    }

    export class FormStore {
        fields: Record<string, FieldStore>;
        initialValues: Record<string, any>;
        constructor(params: IFormStoreArgs);
        get enabledFields(): any;
        get values(): any;
        get normalizedValues(): any
        get isValid(): any;
        get isValidating(): any;
        reset()
        setErrors(errors: Record<string, any>)
    }

    export class FieldStore {
        get isDisabled(): boolean;
        get value(): any;
        get isEmpty(): boolean;
        get normalizedValue(): any;
        get isValidating(): boolean;
        get isValid(): boolean;
        get error(): any;
        constructor(params: IFieldStoreArgs);
        on(...args: any[]): () => void;
        getError(type: any, validation: any): any;
        change(value: any);
        reset();
        setValue(value: any);
        cancelValidation();
        validate();
        asyncValidate(): Promise<void>;
        setError(error: any);
        removeError();
        setValidating(validating: boolean);
        disable();
        enable();
    }

    export function useShowError(args: {
        field: FieldStore;
        showRequiredError: string;
        showValidationErrors: string;
    }): {
        showError: boolean;
        onFocus: (e: any) => void;
        onBlur: (e: any) => void;
    }

}
