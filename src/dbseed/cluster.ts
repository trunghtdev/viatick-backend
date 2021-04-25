export const cluster = [
  {
    code: '0000',
    name: 'BASIC',
    desc:
      'This cluster supports an interface to the node or physical device. It provides attributes and commands for determining basic information, setting user information such as location, and resetting to factory defaults.'
  },
  {
    code: '0001',
    name: 'POWER_CONFIGURATION',
    desc:
      'Attributes for determining detailed information about a device’s power source(s), and for configuring under/over voltage alarms.'
  },
  {
    code: '0003',
    name: 'IDENTIFY',
    desc:
      'Attributes and commands to put a device into an Identification mode (e.g. flashing a light), that indicates to an observer – e.g. an installer - which of several devices it is, also to request any device that is identifying itself to respond to the initiator.'
  },
  {
    code: '0004',
    name: 'GROUPS',
    desc:
      'The ZigBee specification provides the capability for group addressing. That is, any endpoint on any device may be assigned to one or more groups, each labeled with a 16-bit identifier (0x0001 – 0xfff7), which acts for all intents and purposes like a network address. Once a group is established, frames, sent using the APSDE-DATA.request primitive and having a DstAddrMode of 0x01, denoting group addressing, will be delivered to every endpoint assigned to the group address named in the DstAddr parameter of the outgoing APSDE-DATA.request primitive on every device in the network for which there are such endpoints.'
  },
  {
    code: '0005',
    name: 'SCENES',
    desc:
      'The scenes cluster provides attributes and commands for setting up and recalling scenes. Each scene corresponds to a set of stored values of specified attributes for one or more clusters on the same end point as the scenes cluster.'
  },
  {
    code: '0006',
    name: 'ON_OFF',
    desc:
      'Attributes and commands for switching devices between ‘On’ and ‘Off’ states.'
  },
  {
    code: '0007',
    name: 'ON_OFF_SWITCH_CONFIGURATION',
    desc: 'Attributes and commands for configuring On/Off switching devices'
  },
  {
    code: '0008',
    name: 'LEVEL_CONTROL',
    desc:
      'This cluster provides an interface for controlling a characteristic of a device that can be set to a level, for example the brightness of a light, the degree of closure of a door, or the power output of a heater.'
  },
  {
    code: '0009',
    name: 'ALARMS',
    desc:
      'Attributes and commands for sending alarm notifications and configuring alarm functionality.'
  },
  {
    code: '000A',
    name: 'TIME',
    desc:
      'This cluster provides a basic interface to a real-time clock. The clock time MAY be read and also written, in order to synchronize the clock (as close as practical) to a time standard. This time standard is the number of seconds since 0 hrs 0 mins 0 sec on 1st January 2000 UTC (Universal Coordinated Time).'
  },
  {
    code: '000B',
    name: 'RSSI_LOCATION',
    desc:
      'This cluster provides a means for exchanging Received Signal Strength Indication (RSSI) information among one hop devices as well as messages to report RSSI data to a centralized device that collects all the RSSI data in the network.'
  },
  {
    code: '000C',
    name: 'ANALOG_INPUT_BASIC',
    desc:
      'The Analog Input (Basic) cluster provides an interface for reading the value of an analog measurement and accessing various characteristics of that measurement. The cluster is typically used to implement a sensor that measures an analog physical quantity.'
  },
  {
    code: '000F',
    name: 'BINARY_INPUT_BASIC',
    desc:
      'The Binary Input (Basic) cluster provides an interface for reading the value of a binary measurement and accessing various characteristics of that measurement. The cluster is typically used to implement a sensor that measures a two-state physical quantity.'
  },
  {
    code: '0012',
    name: 'MULTISTATE_INPUT_BASIC',
    desc:
      'The Multistate Input (Basic) cluster provides an interface for reading the value of a multistate measurement and accessing various characteristics of that measurement. The cluster is typically used to implement a sensor that measures a physical quantity that can take on one of a number of discrete states.'
  },
  {
    code: '0013',
    name: 'MULTISTATE_OUTPUT_BASIC',
    desc:
      'The Multistate Output (Basic) cluster provides an interface for setting the value of an output that can take one of a number of discrete values, and accessing characteristics of that value.'
  },
  {
    code: '0014',
    name: 'MULTISTATE_VALUE_BASIC',
    desc:
      'The Multistate Value (Basic) cluster provides an interface for setting a multistate value, typically used as a control system parameter, and accessing characteristics of that value.'
  },
  {
    code: '0015',
    name: 'COMMISSIONING',
    desc:
      'This cluster provides attributes and commands pertaining to the commissioning and management of ZigBee devices operating in a network.'
  },
  {
    code: '0019',
    name: 'OTA_UPGRADE',
    desc:
      'The cluster provides a standard way to upgrade devices in the network via OTA messages. Thus the upgrade process MAY be performed between two devices from different manufacturers. Devices are required to have application bootloader and additional memory space in order to successfully implement the cluster.'
  },
  {
    code: '0020',
    name: 'POLL_CONTROL',
    desc:
      'This cluster provides a mechanism for the management of an end device’s MAC Data Request rate. For the purposes of this cluster, the term “poll” always refers to the sending of a MAC Data Request from the end device to the end device’s parent. This cluster can be used for instance by a configuration device to make an end device responsive for a certain period of time so that the device can be managed by the controller. This cluster is composed of a client and server. The end device implements the server side of this cluster. The server side contains several attributes related to the MAC Data Request rate for the device. The client side implements commands used to manage the poll rate for the device. The end device which implements the server side of this cluster sends a query to the client on a predetermined interval to see if the client would like to manage the poll period of the end device in question. When the client side of the cluster hears from the server it has the opportunity to respond with configuration data to either put the end device in a short poll mode or let the end device continue to function normally.'
  },
  {
    code: '0021',
    name: 'GREEN_POWER',
    desc:
      'The Green Power cluster defines the format of the commands exchanged when handling GPDs.'
  },
  {
    code: '0101',
    name: 'DOOR_LOCK',
    desc:
      'The door lock cluster provides an interface to a generic way to secure a door. The physical object that provides the locking functionality is abstracted from the cluster. The cluster has a small list of mandatory attributes and functions and a list of optional features.'
  },
  {
    code: '0102',
    name: 'WINDOW_COVERING',
    desc:
      'Provides an interface for controlling and adjusting automatic window coverings.'
  },
  {
    code: '0201',
    name: 'THERMOSTAT',
    desc:
      'This cluster provides an interface to the functionality of a thermostat.'
  },
  {
    code: '0202',
    name: 'FAN_CONTROL',
    desc:
      'This cluster specifies an interface to control the speed of a fan as part of a heating / cooling system.'
  },
  {
    code: '0203',
    name: 'DEHUMIDIFICATION_CONTROL',
    desc:
      'This cluster provides an interface to dehumidification functionality.'
  },
  {
    code: '0204',
    name: 'THERMOSTAT_USER_INTERFACE_CONFIGURATION',
    desc:
      'This cluster provides an interface to allow configuration of the user interface for a thermostat, or a thermostat controller device, that supports a keypad and LCD screen.'
  },
  {
    code: '0300',
    name: 'COLOR_CONTROL',
    desc:
      'This cluster provides an interface for changing the color of a light. Color is specified according to the Commission Internationale de lÉclairage (CIE) specification CIE 1931 Color Space. Color control is carried out in terms of x,y values, as defined by this specification.'
  },
  {
    code: '0400',
    name: 'ILLUMINANCE_MEASUREMENT',
    desc:
      'The cluster provides an interface to illuminance measurement functionality, including configuration and provision of notifications of illuminance measurements.'
  },
  {
    code: '0401',
    name: 'ILLUMINANCE_LEVEL_SENSING',
    desc:
      'The cluster provides an interface to illuminance level sensing functionality, including configuration and provision of notifications of whether the illuminance is within, above or below a target band.'
  },
  {
    code: '0402',
    name: 'TEMPERATURE_MEASUREMENT',
    desc:
      'The server cluster provides an interface to temperature measurement functionality, including configuration and provision of notifications of temperature measurements.'
  },
  {
    code: '0403',
    name: 'PRESSURE_MEASUREMENT',
    desc:
      'The cluster provides an interface to pressure measurement functionality, including configuration and provision of notifications of pressure measurements.'
  },
  {
    code: '0404',
    name: 'FLOW_MEASUREMENT',
    desc:
      'The server cluster provides an interface to flow measurement functionality, including configuration and provision of notifications of flow measurements.'
  },
  {
    code: '0405',
    name: 'RELATIVE_HUMIDITY_MEASUREMENT',
    desc:
      'The server cluster provides an interface to relative humidity measurement functionality, including configuration and provision of notifications of relative humidity measurements.'
  },
  {
    code: '0406',
    name: 'OCCUPANCY_SENSING',
    desc:
      'The cluster provides an interface to occupancy sensing functionality, including configuration and provision of notifications of occupancy status.'
  },
  {
    code: '0500',
    name: 'IAS_ZONE',
    desc:
      'The IAS Zone cluster defines an interface to the functionality of an IAS security zone device. IAS Zone supports up to two alarm types per zone, low battery reports and supervision of the IAS network.'
  },
  {
    code: '0501',
    name: 'IAS_ACE',
    desc:
      'The IAS ACE cluster defines an interface to the functionality of any Ancillary Control Equipment of the IAS system. Using this cluster, a ZigBee enabled ACE device can access a IAS CIE device and manipulate the IAS system, on behalf of a level-2 user.'
  },
  {
    code: '0502',
    name: 'IAS_WD',
    desc:
      'The IAS WD cluster provides an interface to the functionality of any Warning Device equipment of the IAS system. Using this cluster, a ZigBee enabled CIE device can access a ZigBee enabled IAS WD device and issue alarm warning indications (siren, strobe lighting, etc.) when a system alarm condition is detected.'
  },
  {
    code: '0700',
    name: 'PRICE',
    desc:
      'The Price Cluster provides the mechanism for communicating Gas, Energy, or Water pricing information within the premises. This pricing information is distributed to the ESI from either the utilities or from regional energy providers. The ESI conveys the information (via the Price Cluster mechanisms) to other Smart Energy devices.'
  },
  {
    code: '0701',
    name: 'DEMAND_RESPONSE_AND_LOAD_CONTROL',
    desc:
      'This cluster provides an interface to the functionality of Smart Energy Demand Response and Load Control. Devices targeted by this cluster include thermostats and devices that support load control.'
  },
  {
    code: '0702',
    name: 'METERING',
    desc:
      'The Metering Cluster provides a mechanism to retrieve usage information from Electric, Gas, Water, and potentially Thermal metering devices. These devices can operate on either battery or mains power, and can have a wide variety of sophistication. The Metering Cluster is designed to provide flexibility while limiting capabilities to a set number of metered information types. More advanced forms or data sets from metering devices will be supported in the Smart Energy Tunneling Cluster'
  },
  {
    code: '0703',
    name: 'MESSAGING',
    desc:
      'This cluster provides an interface for passing text messages between ZigBee devices. Messages are expected to be delivered via the ESI and then unicast to all individually registered devices implementing the Messaging Cluster on the ZigBee network, or just made available to all devices for later pickup. Nested and overlapping messages are not allowed. The current active message will be replaced if a new message is received by the ESI.'
  },
  {
    code: '0704',
    name: 'SMART_ENERGY_TUNNELING',
    desc:
      'The tunneling cluster provides an interface for tunneling protocols. It is comprised of commands and attributes required to transport any existing metering communication protocol within the payload of standard ZigBee frames (including the handling of issues such as addressing, fragmentation and flow control). Examples for such protocols are DLMS/COSEM, IEC61107, ANSI C12, M-Bus, ClimateTalk etc.'
  },
  {
    code: '0705',
    name: 'PREPAYMENT',
    desc:
      'The Prepayment Cluster provides the facility to pass messages relating to the accounting functionality of a meter between devices on the HAN. It allows for the implementation of a system conforming to the set of standards relating to Payment Electricity Meters (IEC 62055) and also for the case where the accounting function is remote from the meter. Prepayment is used in situations where the supply of a service may be interrupted or enabled under the control of the meter or system in relation to a payment tariff. The accounting process may be within the meter or elsewhere in the system. The amount of available credit is decremented as the service is consumed and is incremented through payments made by the consumer. Such a system allows the consumer to better manage their energy consumption and reduces the risk of bad debt owing to the supplier.'
  },
  {
    code: '0800',
    name: 'KEY_ESTABLISHMENT',
    desc:
      'This cluster provides attributes and commands to perform mutual authentication and establish keys between two ZigBee devices.'
  },
  {
    code: '0B04',
    name: 'ELECTRICAL_MEASUREMENT',
    desc:
      'This cluster provides a mechanism for querying data about the electrical properties as measured by the device. This cluster may be implemented on any device type and be implemented on a per-endpoint basis. For example, a power strip device could represent each outlet on a different endpoint and report electrical information for each individual outlet. The only caveat is that if you implement an attribute that has an associated multiplier and divisor, then you must implement the associated multiplier and divisor attributes. For example if you implement DCVoltage, you must also implement DCVoltageMultiplier and DCVoltageDivisor.'
  },
  {
    code: '0B05',
    name: 'DIAGNOSTICS',
    desc:
      'The diagnostics cluster provides access to information regarding the operation of the ZigBee stack over time. This information is useful to installers and other network administrators who wish to know how a particular device is functioning on the network.'
  }
]
