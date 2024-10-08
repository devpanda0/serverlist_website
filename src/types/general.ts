export interface GameType {
    id: string;

    name: string;
    logo: string;
    primaryColor: string;
    secondaryColor: string;

    servers: Server[];
    groups: ServerGroup[];
}

export interface ServerGroup {
    id: string;

    name: string;
    logo: string;
    servers: Server[];

    createdAt: Date;
    updatedAt: Date;

    gameType?: GameType | null;
    gameTypeId?: string | null;
}

export interface Server {
    id: string;

    groupId?: string | null;
    isOnline: boolean;
    name: string;
    ipAdress: string;
    vanityUrl: string;
    description: string;
    tags: string[];
    gamemode: string;
    website: string;
    language: string;
    publicVisibility: boolean;
    icon: string;
    banner: string;
    promoted: boolean;
    Group?: ServerGroup | null;
    players: number;
    playerHistory: PlayerHistory[];
    maxPlayers: number;

    createdAt: Date;
    updatedAt: Date;

    gameType?: GameType | null;
    gameTypeId?: string | null;
}

export interface PlayerHistory {
    id: string;

    serverId: string;
    playerCount: number;

    createdAt: Date;

    server: Server;
}
