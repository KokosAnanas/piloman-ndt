const numberFormatter = new Intl.NumberFormat('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
});

export const formatMm = (value: number): string => numberFormatter.format(value);

export const fcBaseText = 'h ≤ 0,1S, но не более 0,5 мм;<br />' +
                                'l ≤ 150 мм.';

export const fdBaseText = 'Для труб: 2 ≤ S ≤ 5 мм — не более 0,4·S; ' + '5 < S ≤ 10 мм — не более 2,0 мм; ' + '10 < S ≤ 15 мм — не более 0,2·S; ' + 'S > 15 мм — не более 3,0 мм.';

export const fcLimit = (s: number | null): number | null => {
    if (s == null) {
        return null;
    }
    const raw = 0.1 * s;
    return raw > 0.5 ? 0.5 : raw;
};

export const fdLimit = (s: number | null): number | null => {
    if (s == null) {
        return null;
    }

    if (s < 2) {
        return null;
    }

    if (s <= 5) {
        return 0.4 * s;
    }

    if (s <= 10) {
        return 2.0;
    }

    if (s <= 15) {
        return 0.2 * s;
    }

    return 3.0;
};

export const describeFc = (s: number | null): string => {
    const limit = fcLimit(s);
    if (limit == null) {
        return fcBaseText;
    }

    return `h ≤ ${formatMm(limit)} мм;<br />l ≤ 150 мм.`;
};

export const describeFd = (s: number | null): string => {
    const limit = fdLimit(s);
    if (limit == null) {
        return fdBaseText;
    }

    return `Смещение кромок не более ${formatMm(limit)} мм.`;
};
