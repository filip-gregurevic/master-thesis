import { AttackCampaign } from '@/types/attackCampaign';
import { DefendTechnique } from '@/types/defendTechnique';
import { AttackGroup } from '@/types/attackGroup';
import { AttackMitigation } from '@/types/attackMitigation';
import { AttackSoftware } from '@/types/attackSoftware';
import { AttackTactic } from '@/types/attackTactic';
import { AttackTechnique } from '@/types/attackTechnique';

export type SearchResult = {
  id: number;
  results: Results;
  searchTerm: string;
  user: any;
};

export type Results = {
  attack: {
    campaigns: AttackCampaign[];
    campaignsTotal: number;
    groups: AttackGroup[];
    groupsTotal: number;
    mitigations: AttackMitigation[];
    mitigationsTotal: number;
    software: AttackSoftware[];
    softwareTotal: number;
    tactics: AttackTactic[];
    tacticsTotal: number;
    techniques: AttackTechnique[];
    techniquesTotal: number;
    total: number;
  };
  defend: {
    techniques: DefendTechnique[];
    techniquesTotal: number;
    total: number;
  };
  total: number;
};
