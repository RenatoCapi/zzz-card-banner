import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import CharProfile from '../../../../src/components/CharTab/charProfilePreview/CharProfile';
import { Character } from '../../../../src/lib/models/Character';
import { CharMetadata } from '../../../../src/lib/models/CharMetadata';

describe('CharProfile', () => {
    const charValid = new Character();
    charValid.name = "";
    charValid.rank = 0;
    //charValid.skillKit = new Skillkit();
    charValid.charMetadata = new CharMetadata();

    it('should render character profile when character is provided', () => {
        render(<CharProfile char={charValid}></CharProfile>);
        screen.debug();
    });
})