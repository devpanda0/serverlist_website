"use client";
import {notifications} from "@mantine/notifications";

export default class NotifyService {
    private readonly _title: string;
    static default = {
        withBorder: true,
        radius: 'md',
    }

    constructor(title: string) {
        this._title = title;
    }


    info(message: string) {
        notifications.show({
            title: this._title,
            message,
            color: "blue",
            ...NotifyService.default
        });
    }

    success(message: string) {
        notifications.show({
            title: this._title,
            message,
            color: "green",
            ...NotifyService.default
        });
    }

    warn(message: string) {
        notifications.show({
            title: this._title,
            message,
            color: "orange",
            ...NotifyService.default
        });
    }

    error(message: string) {
        notifications.show({
            title: this._title,
            message,
            color: "red",
            ...NotifyService.default
        });
    }

    critical(message: string) {
        notifications.show({
            title: this._title,
            message,
            color: "purple",
            ...NotifyService.default
        });
    }
}