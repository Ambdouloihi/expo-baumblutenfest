import '@rneui/themed';

declare module '@rneui/themed' {
    export interface Colors {
        tertiary: string;
        accent: string;
        surface: string;
    }

    export interface TextProps {
        bold?: boolean;
    }

    export interface ComponentTheme {
        Text: Partial<TextProps>
    }        

}
