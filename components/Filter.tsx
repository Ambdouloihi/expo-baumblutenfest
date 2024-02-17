import React from 'react';
import { View, ScrollView } from 'react-native';
import { Chip } from '@rneui/themed';

const commonChipStyle = { margin: 5, borderWidth: 2, backgroundColor: 'white'};

type FilterChipProps = {
  filterOptions: { name: string; icon: string; color: string }[];
  selectedFilters: string[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function FilterChip({ filterOptions, selectedFilters, setSelectedFilters }: FilterChipProps) {
  
  const handleFilterSelection = (filterName: string) => {
    if (selectedFilters.includes(filterName)) {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== filterName));
    } else {
      setSelectedFilters([...selectedFilters, filterName]);
    }
  }

  const allFiltersSelected = selectedFilters.length === filterOptions.length;
  const allFiltersColor = allFiltersSelected ? 'grey' : 'black';

  return (
    <View>
      <ScrollView horizontal style={{ marginHorizontal: 20 }}>
        <Chip
          type="outline"
          onPress={() =>
            allFiltersSelected ?
              setSelectedFilters([]) :
              setSelectedFilters(filterOptions.map((filter) => filter.name))
          }
          buttonStyle={{ borderColor: allFiltersColor, ...commonChipStyle }}
          icon={{ name: 'check', type: 'font-awesome-5', size: 12, color: allFiltersColor }}
          titleStyle={{ color: allFiltersColor, padding: 5 }}
        >
          All
        </Chip>

        {filterOptions.map((filter, index) => {
          const { name, color, icon } = filter;
          const isFilterSelected = selectedFilters.includes(name);
          const chipColor = isFilterSelected ? color : 'grey';
          
          return (
            <Chip
              key={index}
              type="outline"
              onPress={() => handleFilterSelection(name)}
              buttonStyle={{
                borderColor: chipColor,
                ...commonChipStyle
              }}
              icon={{ name: icon, type: 'font-awesome-5', size: 12, color: chipColor }}
              titleStyle={{ color: chipColor, padding: 5 }}
            >
              {name}
            </Chip>
          );
        })}
      </ScrollView>
    </View>
  );
}