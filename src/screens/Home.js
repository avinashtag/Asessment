import React, {useState, useRef, useCallback} from 'react';
import {View, StyleSheet, SafeAreaView, Text} from 'react-native';

import {SearchBar, List} from '@ant-design/react-native';

import {useDispatch, useSelector} from 'react-redux';
import {filterStates, selectState} from './../redux/stateSlice';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';

const Home = () => {
  const dispatch = useDispatch();
  const {filteredStates, allStates} = useSelector(state => state.states);

  const [input, setInput] = useState('');
  const [showList, setShowList] = useState(true);
  const [timer, setTimer] = useState(0);

  const animatedRegion = useRef(
    new AnimatedRegion({
      latitude: 28.9873225,
      longitude: 77.5430694,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    }),
  ).current;

  const [selectedRegion, setSelectedRegion] = useState({
    latitude: 28.9873225,
    longitude: 77.5430694,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  const handleSearch = useCallback(
    text => {
      clearTimeout(timer);
      setTimer(
        setTimeout(() => {
          if (text.trim() === '') {
            dispatch(filterStates(''));
            setShowList(false);
          } else {
            dispatch(filterStates(text));
            setShowList(true);
          }
        }, 100),
      );
    },
    [timer],
  );

  const handleInputChange = value => {
    setInput(value);
    handleSearch(value);
  };

  const handleStateSelect = stateName => {
    setInput(stateName);
    dispatch(selectState(stateName));
    setShowList(false);

    const stateData = allStates.find(state => state.name === stateName);
    if (stateData) {
      const newRegion = {
        latitude: stateData.lat,
        longitude: stateData.long,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      };

      animatedRegion
        .timing(newRegion, {
          duration: 2000,
          useNativeDriver: false,
        })
        .start();

      setSelectedRegion(newRegion);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text>Search for your Location</Text>
        {/* <TextInput
          style={styles.input}
          placeholder="Search States"
          value={input}
          onChangeText={handleInputChange}
        /> */}

        <SearchBar
          value={input}
          placeholder="Search States"
          cancelText="Cancel"
          onChange={handleInputChange}
          onCancel={value => setInput('')}
          showCancelButton={true} // Optional: Show a cancel button
        />
      </SafeAreaView>

      <MapView
        style={styles.map}
        region={selectedRegion}
        onRegionChangeComplete={region => setSelectedRegion(region)}>
        {selectedRegion.latitude !== 0 && (
          <Marker.Animated coordinate={animatedRegion} />
        )}
      </MapView>

      {showList && filteredStates.length > 0 && (
        <List style={styles.flatlistData}>
          {filteredStates.map(item => (
            <List.Item
              key={item.name}
              onPress={() => handleStateSelect(item.name)}
              style={styles.stateItem}>
              {item.name}
            </List.Item>
          ))}
        </List>
      )}

      {/* {showList && filteredStates.length > 0 && (
        <FlatList
          data={filteredStates}
          style={styles.flatlistData}
          contentContainerStyle={{paddingBottom: 50}}
          keyExtractor={item => item.name}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.stateItem}
              onPress={() => handleStateSelect(item.name)}>
              <Text style={styles.listItem}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    height: 40,
    marginTop: 5,
  },
  stateItem: {
    backgroundColor: 'white',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  listItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  map: {
    flex: 1,
    marginTop: 10,
    borderRadius: 10,
  },
  flatlistData: {
    position: 'absolute',
    top: 110,
    left: 20,
    right: 20,
  },
});

export default Home;
