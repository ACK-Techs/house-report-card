export type ResearchMode = 'property' | 'area';
export type Coordinate = { latitude: number; longitude: number };
export type LocationDraft = { city: string; district: string; neighborhood: string; street: string; buildingNumber: string; coordinate: Coordinate | null; selectionMethod: 'map' | 'device' | 'manual' | null };
export type SearchStatus = 'idle' | 'loading' | 'success' | 'empty' | 'error';
export type AddressCandidate = LocationDraft & { id: string; label: string; matchLabel: 'Frontend geliştirme eşleşmesi' };
export const emptyLocationDraft = (): LocationDraft => ({ city: '', district: '', neighborhood: '', street: '', buildingNumber: '', coordinate: null, selectionMethod: null });
