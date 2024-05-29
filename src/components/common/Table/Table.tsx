import React from "react";

import styles from "./Table.module.css";

import { Link } from "react-router-dom";

export interface Column<T> {
    header: string;
    accessor: (item: T) => any;
    type?: string;
    linkAccessor?: (item: T) => string | undefined;
}


interface TableProps<T extends { id: any }> {
    columns: Column<T>[];
    data: T[];
    handleEdit?: (item: T) => void;
    handleDelete?: (item: T) => void;
}

export const Table = <T extends { id: any},>({ columns, data, handleEdit, handleDelete }: TableProps<T>): JSX.Element => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index} className={styles.th}>
                            {column.header}
                        </th>
                    ))}
                    {(handleEdit || handleDelete) && <th className={styles.th}>Ações</th>}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr className={styles.row} key={index}>
                        {columns.map((column, columnIndex) => (
                            column.type === "image" ?
                                <td key={columnIndex} className={styles.td}>
                                    <img src={column.accessor(item)} alt="Imagem" />
                                </td>
                                :
                                <td key={columnIndex} className={styles.td}>
                                    <Link className={styles.link} to={`/${column.type  ? column.type : "pessoa"}/${column.linkAccessor ? column.linkAccessor(item) : item.id}`}>
                                        {column.accessor(item)}
                                    </Link>
                                </td>
                        ))}
                        {(handleEdit || handleDelete) && (
                            <td className={`${styles.td} ${styles.buttons}`}>
                                {handleEdit && <button onClick={() => handleEdit(item)}>
                                    Editar
                                </button>}
                                {handleDelete && <button onClick={() => handleDelete(item)}>
                                    Excluir
                                </button>}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};