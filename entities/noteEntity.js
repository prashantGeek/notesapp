import { EntitySchema } from "typeorm";

export const Note = new EntitySchema({
    name: "Note",
    tableName: "notes",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        title: {
            type: "varchar",
            length: 255,
            nullable: false,
        },
        content: {
            type: "text",
            nullable: true,
        },
        createdAt: {
            type: "timestamp",
            createDate: true,
        },
        updatedAt: {
            type: "timestamp",
            updateDate: true,
        },
    },
    relations: {
        user: {
            target: "User",
            type: "many-to-one",
            joinColumn: {
                name: "userId",
                referencedColumnName: "id",
            },
            onDelete: "CASCADE",
        },
    },
});