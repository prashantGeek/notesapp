import { EntitySchema } from "typeorm";

export const User = new EntitySchema({
    name: "User",
    tableName: "users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        googleId: {
            type: "varchar",
            unique: true,
            nullable: false,
        },
        email: {
            type: "varchar",
            unique: true,
            nullable: false,
        },
        name: {
            type: "varchar",
            nullable: false,
        },
        profilePicture: {
            type: "varchar",
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
        notes: {
            target: "Note",
            type: "one-to-many",
            inverseSide: "user",
        },
    },
});