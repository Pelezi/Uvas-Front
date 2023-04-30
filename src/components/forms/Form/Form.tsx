import React from "react";

import { Formik, FormikHelpers, FormikProps, FormikValues, Form as FormikForm } from "formik";
import * as Yup from "yup";

import styles from "./Form.module.css";

interface FormProps<T> {
    initialValues: T;
    validationSchema: Yup.ObjectSchema<Partial<T>>;
    onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<void>;
    children: (FormikProps: FormikProps<T>) => React.ReactNode;
    enableReinitialize?: boolean;
    isSmall?: boolean;
}

const Form = <T extends FormikValues>({ initialValues, validationSchema, enableReinitialize, isSmall, onSubmit, children }: FormProps<T>) => {
    return (
        <div className={`${styles.formWrapper} ${isSmall && styles.smallWrapper}`}>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize={enableReinitialize}
                onSubmit={onSubmit}
            >
                {(formikProps) => (
                    <FormikForm className={styles.form}>
                        {children(formikProps)}
                    </FormikForm>
                )}
            </Formik>
        </div>
    );
};

export default Form;