import { Issue, TimelineEvent } from "./types";

export const MOCK_ISSUES: Issue[] = [
  {
    "id": "CIV-10401",
    "title": "Damaged footpath",
    "type": "Damaged footpath",
    "originalLanguage": "en",
    "originalDescription": "There is a large pothole near the bus stop.",
    "description": "This is a reported issue regarding damaged footpath. Open manhole posing severe danger to pedestrians.",
    "location": "Street 51, Ahmedabad",
    "ward": "Ward 122",
    "city": "Ahmedabad",
    "state": "Gujarat",
    "authority": "Water Board",
    "lat": 13.021960223760113,
    "lng": 80.23654206516555,
    "status": "Closed",
    "priority": "High",
    "department": "Drainage",
    "reportedAt": "2026-08-17T14:20:03.402Z",
    "updatedAt": "2026-08-21T01:22:14.672Z",
    "reportsCount": 2,
    "aiConfidence": 99,
    "assignee": "Team N",
    "slaHours": 48,
    "slaRemaining": "0h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-1-1",
        "title": "Report submitted",
        "timestamp": "2026-08-17T14:20:03.402Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-1-2",
        "title": "Assigned",
        "timestamp": "2026-08-17T20:11:21.822Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Sanitation team."
      },
      {
        "id": "tl-1-3",
        "title": "Work started",
        "timestamp": "2026-08-18T07:42:21.293Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      },
      {
        "id": "tl-1-4",
        "title": "Work completed",
        "timestamp": "2026-08-20T11:31:48.453Z",
        "status": "Resolved",
        "actor": "Field Team",
        "action": "Work completed",
        "description": "Physical work has been completed.",
        "notes": "Awaiting citizen verification."
      },
      {
        "id": "tl-1-5",
        "title": "Citizen verified",
        "timestamp": "2026-08-21T01:22:14.672Z",
        "status": "Closed",
        "actor": "Citizen",
        "action": "Resolution confirmed",
        "description": "Citizen confirmed the resolution.",
        "notes": "Issue permanently closed."
      }
    ]
  },
  {
    "id": "CIV-10402",
    "title": "Road debris",
    "type": "Road debris",
    "originalLanguage": "hi",
    "originalDescription": "????? ?? ??? ???? ?? ?? ???? ????? ???",
    "description": "This is a reported issue regarding road debris. There is a large pothole near the bus stop.",
    "location": "Street 90, Kolkata",
    "ward": "Ward 14",
    "city": "Kolkata",
    "state": "West Bengal",
    "authority": "Water Board",
    "lat": 13.024987707340975,
    "lng": 80.2681831288695,
    "status": "Resolved",
    "priority": "High",
    "department": "Drainage",
    "reportedAt": "2026-08-12T07:34:28.765Z",
    "updatedAt": "2026-08-13T09:18:06.119Z",
    "reportsCount": 2,
    "aiConfidence": 97,
    "assignee": "Team Q",
    "slaHours": 48,
    "slaRemaining": "0h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-2-1",
        "title": "Report submitted",
        "timestamp": "2026-08-12T07:34:28.765Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-2-2",
        "title": "Assigned",
        "timestamp": "2026-08-12T10:40:18.011Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Drainage team."
      },
      {
        "id": "tl-2-3",
        "title": "Work started",
        "timestamp": "2026-08-12T14:15:24.316Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      },
      {
        "id": "tl-2-4",
        "title": "Work completed",
        "timestamp": "2026-08-13T09:18:06.119Z",
        "status": "Resolved",
        "actor": "Field Team",
        "action": "Work completed",
        "description": "Physical work has been completed.",
        "notes": "Awaiting citizen verification."
      }
    ]
  },
  {
    "id": "CIV-10403",
    "title": "Pothole",
    "type": "Pothole",
    "originalLanguage": "ta",
    "originalDescription": "????????? ?? ???????? ???????????????.",
    "description": "This is a reported issue regarding pothole. Garbage has accumulated for days and is smelling bad.",
    "location": "Street 96, Jaipur",
    "ward": "Ward 20",
    "city": "Jaipur",
    "state": "Rajasthan",
    "authority": "Public Works Department",
    "lat": 13.021852486594714,
    "lng": 80.28451799507492,
    "status": "Submitted",
    "priority": "Critical",
    "department": "Water",
    "reportedAt": "2026-07-29T19:48:59.896Z",
    "updatedAt": "2026-07-29T19:48:59.896Z",
    "reportsCount": 4,
    "aiConfidence": 83,
    "assignee": "Team A",
    "slaHours": 48,
    "slaRemaining": "13h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-3-1",
        "title": "Report submitted",
        "timestamp": "2026-07-29T19:48:59.896Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      }
    ]
  },
  {
    "id": "CIV-10404",
    "title": "Damaged footpath",
    "type": "Damaged footpath",
    "originalLanguage": "hi",
    "originalDescription": "???? ?? ???? ???? ?? ?? ??? ???",
    "description": "This is a reported issue regarding damaged footpath. Garbage has accumulated for days and is smelling bad.",
    "location": "Street 66, Delhi",
    "ward": "Ward 141",
    "city": "Delhi",
    "state": "Delhi",
    "authority": "Municipal Corporation",
    "lat": 13.081443179228044,
    "lng": 80.21367454368085,
    "status": "Closed",
    "priority": "Critical",
    "department": "Water",
    "reportedAt": "2026-08-25T00:51:43.529Z",
    "updatedAt": "2026-08-28T02:31:08.182Z",
    "reportsCount": 4,
    "aiConfidence": 93,
    "assignee": "Team H",
    "slaHours": 24,
    "slaRemaining": "0h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-4-1",
        "title": "Report submitted",
        "timestamp": "2026-08-25T00:51:43.529Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-4-2",
        "title": "Assigned",
        "timestamp": "2026-08-25T04:56:14.045Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Parks team."
      },
      {
        "id": "tl-4-3",
        "title": "Work started",
        "timestamp": "2026-08-25T15:40:58.663Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      },
      {
        "id": "tl-4-4",
        "title": "Work completed",
        "timestamp": "2026-08-27T17:33:24.206Z",
        "status": "Resolved",
        "actor": "Field Team",
        "action": "Work completed",
        "description": "Physical work has been completed.",
        "notes": "Awaiting citizen verification."
      },
      {
        "id": "tl-4-5",
        "title": "Citizen verified",
        "timestamp": "2026-08-28T02:31:08.182Z",
        "status": "Closed",
        "actor": "Citizen",
        "action": "Resolution confirmed",
        "description": "Citizen confirmed the resolution.",
        "notes": "Issue permanently closed."
      }
    ]
  },
  {
    "id": "CIV-10405",
    "title": "Garbage accumulation",
    "type": "Garbage accumulation",
    "originalLanguage": "en",
    "originalDescription": "Garbage has accumulated for days and is smelling bad.",
    "description": "This is a reported issue regarding garbage accumulation. Open manhole posing severe danger to pedestrians.",
    "location": "Street 66, Kolkata",
    "ward": "Ward 50",
    "city": "Kolkata",
    "state": "West Bengal",
    "authority": "Municipal Corporation",
    "lat": 13.077421768563989,
    "lng": 80.24774598512857,
    "status": "Resolved",
    "priority": "Low",
    "department": "Parks",
    "reportedAt": "2026-08-10T20:27:56.499Z",
    "updatedAt": "2026-08-13T05:38:11.820Z",
    "reportsCount": 3,
    "aiConfidence": 91,
    "assignee": "Team V",
    "slaHours": 72,
    "slaRemaining": "0h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-5-1",
        "title": "Report submitted",
        "timestamp": "2026-08-10T20:27:56.499Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-5-2",
        "title": "Assigned",
        "timestamp": "2026-08-10T22:29:36.820Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Sanitation team."
      },
      {
        "id": "tl-5-3",
        "title": "Work started",
        "timestamp": "2026-08-11T09:43:18.296Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      },
      {
        "id": "tl-5-4",
        "title": "Work completed",
        "timestamp": "2026-08-13T05:38:11.820Z",
        "status": "Resolved",
        "actor": "Field Team",
        "action": "Work completed",
        "description": "Physical work has been completed.",
        "notes": "Awaiting citizen verification."
      }
    ]
  },
  {
    "id": "CIV-10406",
    "title": "Fallen tree",
    "type": "Fallen tree",
    "originalLanguage": "ta",
    "originalDescription": "????????? ??????? ???????? ????? ???? ??????.",
    "description": "This is a reported issue regarding fallen tree. There is a large pothole near the bus stop.",
    "location": "Street 87, Ahmedabad",
    "ward": "Ward 102",
    "city": "Ahmedabad",
    "state": "Gujarat",
    "authority": "Public Works Department",
    "lat": 13.088563301425724,
    "lng": 80.26363631768957,
    "status": "Closed",
    "priority": "Medium",
    "department": "Parks",
    "reportedAt": "2026-08-21T01:19:01.274Z",
    "updatedAt": "2026-08-22T10:06:21.628Z",
    "reportsCount": 4,
    "aiConfidence": 91,
    "assignee": "Team D",
    "slaHours": 48,
    "slaRemaining": "0h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-6-1",
        "title": "Report submitted",
        "timestamp": "2026-08-21T01:19:01.274Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-6-2",
        "title": "Assigned",
        "timestamp": "2026-08-21T03:13:04.658Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Electrical team."
      },
      {
        "id": "tl-6-3",
        "title": "Work started",
        "timestamp": "2026-08-21T12:19:30.383Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      },
      {
        "id": "tl-6-4",
        "title": "Work completed",
        "timestamp": "2026-08-21T23:27:29.224Z",
        "status": "Resolved",
        "actor": "Field Team",
        "action": "Work completed",
        "description": "Physical work has been completed.",
        "notes": "Awaiting citizen verification."
      },
      {
        "id": "tl-6-5",
        "title": "Citizen verified",
        "timestamp": "2026-08-22T10:06:21.628Z",
        "status": "Closed",
        "actor": "Citizen",
        "action": "Resolution confirmed",
        "description": "Citizen confirmed the resolution.",
        "notes": "Issue permanently closed."
      }
    ]
  },
  {
    "id": "CIV-10407",
    "title": "Open manhole",
    "type": "Open manhole",
    "originalLanguage": "en",
    "originalDescription": "Open manhole posing severe danger to pedestrians.",
    "description": "This is a reported issue regarding open manhole. The streetlight is broken and the area is completely dark.",
    "location": "Street 99, Ahmedabad",
    "ward": "Ward 19",
    "city": "Ahmedabad",
    "state": "Gujarat",
    "authority": "Public Works Department",
    "lat": 13.072914493406772,
    "lng": 80.28809307546793,
    "status": "In Progress",
    "priority": "High",
    "department": "Electrical",
    "reportedAt": "2026-08-20T06:14:56.479Z",
    "updatedAt": "2026-08-20T14:01:03.770Z",
    "reportsCount": 4,
    "aiConfidence": 99,
    "assignee": "Team K",
    "slaHours": 48,
    "slaRemaining": "-6h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-7-1",
        "title": "Report submitted",
        "timestamp": "2026-08-20T06:14:56.479Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-7-2",
        "title": "Assigned",
        "timestamp": "2026-08-20T10:49:01.292Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Drainage team."
      },
      {
        "id": "tl-7-3",
        "title": "Work started",
        "timestamp": "2026-08-20T14:01:03.770Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      }
    ]
  },
  {
    "id": "CIV-10408",
    "title": "Road debris",
    "type": "Road debris",
    "originalLanguage": "en",
    "originalDescription": "Garbage has accumulated for days and is smelling bad.",
    "description": "This is a reported issue regarding road debris. Open manhole posing severe danger to pedestrians.",
    "location": "Street 63, Pune",
    "ward": "Ward 132",
    "city": "Pune",
    "state": "Maharashtra",
    "authority": "Public Works Department",
    "lat": 13.016023849934477,
    "lng": 80.22927763998283,
    "status": "Closed",
    "priority": "Low",
    "department": "Water",
    "reportedAt": "2026-08-05T14:26:33.303Z",
    "updatedAt": "2026-08-09T00:13:02.348Z",
    "reportsCount": 4,
    "aiConfidence": 94,
    "assignee": "Team I",
    "slaHours": 48,
    "slaRemaining": "0h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-8-1",
        "title": "Report submitted",
        "timestamp": "2026-08-05T14:26:33.303Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-8-2",
        "title": "Assigned",
        "timestamp": "2026-08-05T16:21:13.493Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Electrical team."
      },
      {
        "id": "tl-8-3",
        "title": "Work started",
        "timestamp": "2026-08-06T03:54:12.998Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      },
      {
        "id": "tl-8-4",
        "title": "Work completed",
        "timestamp": "2026-08-08T06:01:42.042Z",
        "status": "Resolved",
        "actor": "Field Team",
        "action": "Work completed",
        "description": "Physical work has been completed.",
        "notes": "Awaiting citizen verification."
      },
      {
        "id": "tl-8-5",
        "title": "Citizen verified",
        "timestamp": "2026-08-09T00:13:02.348Z",
        "status": "Closed",
        "actor": "Citizen",
        "action": "Resolution confirmed",
        "description": "Citizen confirmed the resolution.",
        "notes": "Issue permanently closed."
      }
    ]
  },
  {
    "id": "CIV-10409",
    "title": "Road flooding",
    "type": "Road flooding",
    "originalLanguage": "hi",
    "originalDescription": "????? ?? ??? ???? ?? ?? ???? ????? ???",
    "description": "This is a reported issue regarding road flooding. Open manhole posing severe danger to pedestrians.",
    "location": "Street 35, Delhi",
    "ward": "Ward 125",
    "city": "Delhi",
    "state": "Delhi",
    "authority": "Municipal Corporation",
    "lat": 13.0786547066052,
    "lng": 80.24823524576625,
    "status": "Submitted",
    "priority": "Critical",
    "department": "Electrical",
    "reportedAt": "2026-08-14T22:41:29.237Z",
    "updatedAt": "2026-08-14T22:41:29.237Z",
    "reportsCount": 4,
    "aiConfidence": 85,
    "assignee": "Team X",
    "slaHours": 72,
    "slaRemaining": "27h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-9-1",
        "title": "Report submitted",
        "timestamp": "2026-08-14T22:41:29.237Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      }
    ]
  },
  {
    "id": "CIV-10410",
    "title": "Broken streetlight",
    "type": "Broken streetlight",
    "originalLanguage": "hi",
    "originalDescription": "???? ?? ???? ???? ?? ?? ??? ???",
    "description": "This is a reported issue regarding broken streetlight. Open manhole posing severe danger to pedestrians.",
    "location": "Street 60, Chennai",
    "ward": "Ward 25",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "authority": "Water Board",
    "lat": 13.05454719539774,
    "lng": 80.27475559637955,
    "status": "Submitted",
    "priority": "High",
    "department": "Electrical",
    "reportedAt": "2026-07-29T15:51:30.384Z",
    "updatedAt": "2026-07-29T15:51:30.384Z",
    "reportsCount": 2,
    "aiConfidence": 83,
    "assignee": "Team H",
    "slaHours": 48,
    "slaRemaining": "35h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-10-1",
        "title": "Report submitted",
        "timestamp": "2026-07-29T15:51:30.384Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      }
    ]
  },
  {
    "id": "CIV-10411",
    "title": "Overflowing drain",
    "type": "Overflowing drain",
    "originalLanguage": "ta",
    "originalDescription": "????????? ??????? ???????? ????? ???? ??????.",
    "description": "This is a reported issue regarding overflowing drain. Garbage has accumulated for days and is smelling bad.",
    "location": "Street 61, Surat",
    "ward": "Ward 124",
    "city": "Surat",
    "state": "Gujarat",
    "authority": "Public Works Department",
    "lat": 13.005506124742105,
    "lng": 80.22108501669842,
    "status": "Resolved",
    "priority": "Low",
    "department": "Drainage",
    "reportedAt": "2026-08-23T14:24:53.935Z",
    "updatedAt": "2026-08-25T20:20:11.368Z",
    "reportsCount": 4,
    "aiConfidence": 96,
    "assignee": "Team J",
    "slaHours": 72,
    "slaRemaining": "0h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-11-1",
        "title": "Report submitted",
        "timestamp": "2026-08-23T14:24:53.935Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-11-2",
        "title": "Assigned",
        "timestamp": "2026-08-23T19:46:53.252Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Roads team."
      },
      {
        "id": "tl-11-3",
        "title": "Work started",
        "timestamp": "2026-08-23T22:37:50.377Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      },
      {
        "id": "tl-11-4",
        "title": "Work completed",
        "timestamp": "2026-08-25T20:20:11.368Z",
        "status": "Resolved",
        "actor": "Field Team",
        "action": "Work completed",
        "description": "Physical work has been completed.",
        "notes": "Awaiting citizen verification."
      }
    ]
  },
  {
    "id": "CIV-10412",
    "title": "Open manhole",
    "type": "Open manhole",
    "originalLanguage": "en",
    "originalDescription": "Open manhole posing severe danger to pedestrians.",
    "description": "This is a reported issue regarding open manhole. Garbage has accumulated for days and is smelling bad.",
    "location": "Street 17, Jaipur",
    "ward": "Ward 4",
    "city": "Jaipur",
    "state": "Rajasthan",
    "authority": "Water Board",
    "lat": 13.03193493764751,
    "lng": 80.20827577903299,
    "status": "In Progress",
    "priority": "Medium",
    "department": "Water",
    "reportedAt": "2026-08-13T14:53:16.157Z",
    "updatedAt": "2026-08-14T04:31:20.091Z",
    "reportsCount": 4,
    "aiConfidence": 93,
    "assignee": "Team Z",
    "slaHours": 72,
    "slaRemaining": "-3h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-12-1",
        "title": "Report submitted",
        "timestamp": "2026-08-13T14:53:16.157Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-12-2",
        "title": "Assigned",
        "timestamp": "2026-08-13T20:24:35.937Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Parks team."
      },
      {
        "id": "tl-12-3",
        "title": "Work started",
        "timestamp": "2026-08-14T04:31:20.091Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      }
    ]
  },
  {
    "id": "CIV-10413",
    "title": "Water leakage",
    "type": "Water leakage",
    "originalLanguage": "hi",
    "originalDescription": "?? ????? ?? ???? ???? ????? ??? ???",
    "description": "This is a reported issue regarding water leakage. The streetlight is broken and the area is completely dark.",
    "location": "Street 93, Mumbai",
    "ward": "Ward 102",
    "city": "Mumbai",
    "state": "Maharashtra",
    "authority": "Water Board",
    "lat": 13.041552842359227,
    "lng": 80.27843484171159,
    "status": "In Progress",
    "priority": "Critical",
    "department": "Roads",
    "reportedAt": "2026-08-06T06:53:30.732Z",
    "updatedAt": "2026-08-06T16:57:45.143Z",
    "reportsCount": 3,
    "aiConfidence": 80,
    "assignee": "Team L",
    "slaHours": 24,
    "slaRemaining": "-2h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-13-1",
        "title": "Report submitted",
        "timestamp": "2026-08-06T06:53:30.732Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-13-2",
        "title": "Assigned",
        "timestamp": "2026-08-06T08:19:14.417Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Parks team."
      },
      {
        "id": "tl-13-3",
        "title": "Work started",
        "timestamp": "2026-08-06T16:57:45.143Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      }
    ]
  },
  {
    "id": "CIV-10414",
    "title": "Damaged footpath",
    "type": "Damaged footpath",
    "originalLanguage": "hi",
    "originalDescription": "????? ?? ??? ???? ?? ?? ???? ????? ???",
    "description": "This is a reported issue regarding damaged footpath. Open manhole posing severe danger to pedestrians.",
    "location": "Street 11, Surat",
    "ward": "Ward 91",
    "city": "Surat",
    "state": "Gujarat",
    "authority": "Public Works Department",
    "lat": 13.00330400456024,
    "lng": 80.26104433526426,
    "status": "Resolved",
    "priority": "High",
    "department": "Water",
    "reportedAt": "2026-08-07T21:15:02.260Z",
    "updatedAt": "2026-08-09T23:17:51.983Z",
    "reportsCount": 3,
    "aiConfidence": 81,
    "assignee": "Team E",
    "slaHours": 48,
    "slaRemaining": "0h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-14-1",
        "title": "Report submitted",
        "timestamp": "2026-08-07T21:15:02.260Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-14-2",
        "title": "Assigned",
        "timestamp": "2026-08-07T22:34:44.615Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Electrical team."
      },
      {
        "id": "tl-14-3",
        "title": "Work started",
        "timestamp": "2026-08-08T04:28:51.740Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      },
      {
        "id": "tl-14-4",
        "title": "Work completed",
        "timestamp": "2026-08-09T23:17:51.983Z",
        "status": "Resolved",
        "actor": "Field Team",
        "action": "Work completed",
        "description": "Physical work has been completed.",
        "notes": "Awaiting citizen verification."
      }
    ]
  },
  {
    "id": "CIV-10415",
    "title": "Road debris",
    "type": "Road debris",
    "originalLanguage": "hi",
    "originalDescription": "?? ????? ?? ???? ???? ????? ??? ???",
    "description": "This is a reported issue regarding road debris. The streetlight is broken and the area is completely dark.",
    "location": "Street 70, Pune",
    "ward": "Ward 97",
    "city": "Pune",
    "state": "Maharashtra",
    "authority": "Water Board",
    "lat": 13.038362829987133,
    "lng": 80.28255559329125,
    "status": "Assigned",
    "priority": "Medium",
    "department": "Parks",
    "reportedAt": "2026-08-25T16:15:50.342Z",
    "updatedAt": "2026-08-25T19:03:28.167Z",
    "reportsCount": 3,
    "aiConfidence": 96,
    "assignee": "Team W",
    "slaHours": 72,
    "slaRemaining": "6h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-15-1",
        "title": "Report submitted",
        "timestamp": "2026-08-25T16:15:50.342Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-15-2",
        "title": "Assigned",
        "timestamp": "2026-08-25T19:03:28.167Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Roads team."
      }
    ]
  },
  {
    "id": "CIV-10416",
    "title": "Overflowing drain",
    "type": "Overflowing drain",
    "originalLanguage": "en",
    "originalDescription": "Garbage has accumulated for days and is smelling bad.",
    "description": "This is a reported issue regarding overflowing drain. Garbage has accumulated for days and is smelling bad.",
    "location": "Street 50, Ahmedabad",
    "ward": "Ward 62",
    "city": "Ahmedabad",
    "state": "Gujarat",
    "authority": "Municipal Corporation",
    "lat": 13.073629841912743,
    "lng": 80.23741152261931,
    "status": "Resolved",
    "priority": "Medium",
    "department": "Parks",
    "reportedAt": "2026-08-17T15:59:52.893Z",
    "updatedAt": "2026-08-18T05:47:37.134Z",
    "reportsCount": 2,
    "aiConfidence": 88,
    "assignee": "Team J",
    "slaHours": 48,
    "slaRemaining": "0h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-16-1",
        "title": "Report submitted",
        "timestamp": "2026-08-17T15:59:52.893Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-16-2",
        "title": "Assigned",
        "timestamp": "2026-08-17T20:19:19.797Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Electrical team."
      },
      {
        "id": "tl-16-3",
        "title": "Work started",
        "timestamp": "2026-08-17T23:48:32.430Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      },
      {
        "id": "tl-16-4",
        "title": "Work completed",
        "timestamp": "2026-08-18T05:47:37.134Z",
        "status": "Resolved",
        "actor": "Field Team",
        "action": "Work completed",
        "description": "Physical work has been completed.",
        "notes": "Awaiting citizen verification."
      }
    ]
  },
  {
    "id": "CIV-10417",
    "title": "Pothole",
    "type": "Pothole",
    "originalLanguage": "hi",
    "originalDescription": "??????? ???? ??? ???? ?? ??? ??, ???? ?????? ???",
    "description": "This is a reported issue regarding pothole. There is a large pothole near the bus stop.",
    "location": "Street 73, Kolkata",
    "ward": "Ward 31",
    "city": "Kolkata",
    "state": "West Bengal",
    "authority": "Public Works Department",
    "lat": 13.026553927975746,
    "lng": 80.23690355445437,
    "status": "Resolved",
    "priority": "Critical",
    "department": "Electrical",
    "reportedAt": "2026-08-01T15:40:03.630Z",
    "updatedAt": "2026-08-03T17:21:15.100Z",
    "reportsCount": 3,
    "aiConfidence": 81,
    "assignee": "Team H",
    "slaHours": 72,
    "slaRemaining": "0h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-17-1",
        "title": "Report submitted",
        "timestamp": "2026-08-01T15:40:03.630Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-17-2",
        "title": "Assigned",
        "timestamp": "2026-08-01T19:03:32.477Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Water team."
      },
      {
        "id": "tl-17-3",
        "title": "Work started",
        "timestamp": "2026-08-01T21:24:26.799Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      },
      {
        "id": "tl-17-4",
        "title": "Work completed",
        "timestamp": "2026-08-03T17:21:15.100Z",
        "status": "Resolved",
        "actor": "Field Team",
        "action": "Work completed",
        "description": "Physical work has been completed.",
        "notes": "Awaiting citizen verification."
      }
    ]
  },
  {
    "id": "CIV-10418",
    "title": "Overflowing drain",
    "type": "Overflowing drain",
    "originalLanguage": "en",
    "originalDescription": "There is a large pothole near the bus stop.",
    "description": "This is a reported issue regarding overflowing drain. The streetlight is broken and the area is completely dark.",
    "location": "Street 17, Mumbai",
    "ward": "Ward 51",
    "city": "Mumbai",
    "state": "Maharashtra",
    "authority": "Water Board",
    "lat": 13.033044108767358,
    "lng": 80.24030480312015,
    "status": "Closed",
    "priority": "High",
    "department": "Electrical",
    "reportedAt": "2026-08-08T17:17:05.786Z",
    "updatedAt": "2026-08-10T21:34:18.848Z",
    "reportsCount": 4,
    "aiConfidence": 91,
    "assignee": "Team S",
    "slaHours": 48,
    "slaRemaining": "0h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-18-1",
        "title": "Report submitted",
        "timestamp": "2026-08-08T17:17:05.786Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-18-2",
        "title": "Assigned",
        "timestamp": "2026-08-08T20:02:35.970Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Drainage team."
      },
      {
        "id": "tl-18-3",
        "title": "Work started",
        "timestamp": "2026-08-09T07:13:01.454Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      },
      {
        "id": "tl-18-4",
        "title": "Work completed",
        "timestamp": "2026-08-10T02:02:51.367Z",
        "status": "Resolved",
        "actor": "Field Team",
        "action": "Work completed",
        "description": "Physical work has been completed.",
        "notes": "Awaiting citizen verification."
      },
      {
        "id": "tl-18-5",
        "title": "Citizen verified",
        "timestamp": "2026-08-10T21:34:18.848Z",
        "status": "Closed",
        "actor": "Citizen",
        "action": "Resolution confirmed",
        "description": "Citizen confirmed the resolution.",
        "notes": "Issue permanently closed."
      }
    ]
  },
  {
    "id": "CIV-10419",
    "title": "Garbage accumulation",
    "type": "Garbage accumulation",
    "originalLanguage": "hi",
    "originalDescription": "?? ????? ?? ???? ???? ????? ??? ???",
    "description": "This is a reported issue regarding garbage accumulation. Garbage has accumulated for days and is smelling bad.",
    "location": "Street 18, Pune",
    "ward": "Ward 81",
    "city": "Pune",
    "state": "Maharashtra",
    "authority": "Municipal Corporation",
    "lat": 13.059762158718604,
    "lng": 80.29523883180094,
    "status": "Resolved",
    "priority": "Low",
    "department": "Sanitation",
    "reportedAt": "2026-08-21T07:22:12.436Z",
    "updatedAt": "2026-08-22T11:24:44.440Z",
    "reportsCount": 2,
    "aiConfidence": 80,
    "assignee": "Team E",
    "slaHours": 48,
    "slaRemaining": "0h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-19-1",
        "title": "Report submitted",
        "timestamp": "2026-08-21T07:22:12.436Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-19-2",
        "title": "Assigned",
        "timestamp": "2026-08-21T10:58:15.977Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Sanitation team."
      },
      {
        "id": "tl-19-3",
        "title": "Work started",
        "timestamp": "2026-08-21T20:03:44.522Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      },
      {
        "id": "tl-19-4",
        "title": "Work completed",
        "timestamp": "2026-08-22T11:24:44.440Z",
        "status": "Resolved",
        "actor": "Field Team",
        "action": "Work completed",
        "description": "Physical work has been completed.",
        "notes": "Awaiting citizen verification."
      }
    ]
  },
  {
    "id": "CIV-10420",
    "title": "Stray cattle",
    "type": "Stray cattle",
    "originalLanguage": "hi",
    "originalDescription": "?? ????? ?? ???? ???? ????? ??? ???",
    "description": "This is a reported issue regarding stray cattle. The streetlight is broken and the area is completely dark.",
    "location": "Street 69, Mumbai",
    "ward": "Ward 86",
    "city": "Mumbai",
    "state": "Maharashtra",
    "authority": "Municipal Corporation",
    "lat": 13.006489261449474,
    "lng": 80.24882113169518,
    "status": "Submitted",
    "priority": "Critical",
    "department": "Sanitation",
    "reportedAt": "2026-08-20T14:40:37.623Z",
    "updatedAt": "2026-08-20T14:40:37.623Z",
    "reportsCount": 3,
    "aiConfidence": 92,
    "assignee": "Team B",
    "slaHours": 24,
    "slaRemaining": "30h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-20-1",
        "title": "Report submitted",
        "timestamp": "2026-08-20T14:40:37.623Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      }
    ]
  },
  {
    "id": "CIV-10421",
    "title": "Traffic signal damage",
    "type": "Traffic signal damage",
    "originalLanguage": "ta",
    "originalDescription": "??????? ???? ???????? ?????????????? ????????.",
    "description": "This is a reported issue regarding traffic signal damage. There is a large pothole near the bus stop.",
    "location": "Street 72, Ahmedabad",
    "ward": "Ward 21",
    "city": "Ahmedabad",
    "state": "Gujarat",
    "authority": "Municipal Corporation",
    "lat": 13.085870325140048,
    "lng": 80.22440316585478,
    "status": "In Progress",
    "priority": "Low",
    "department": "Water",
    "reportedAt": "2026-08-11T22:25:44.906Z",
    "updatedAt": "2026-08-12T08:06:58.171Z",
    "reportsCount": 3,
    "aiConfidence": 91,
    "assignee": "Team T",
    "slaHours": 72,
    "slaRemaining": "-1h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-21-1",
        "title": "Report submitted",
        "timestamp": "2026-08-11T22:25:44.906Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-21-2",
        "title": "Assigned",
        "timestamp": "2026-08-12T02:03:16.520Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Drainage team."
      },
      {
        "id": "tl-21-3",
        "title": "Work started",
        "timestamp": "2026-08-12T08:06:58.171Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      }
    ]
  },
  {
    "id": "CIV-10422",
    "title": "Stray cattle",
    "type": "Stray cattle",
    "originalLanguage": "en",
    "originalDescription": "Garbage has accumulated for days and is smelling bad.",
    "description": "This is a reported issue regarding stray cattle. There is a large pothole near the bus stop.",
    "location": "Street 35, Chennai",
    "ward": "Ward 88",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "authority": "Public Works Department",
    "lat": 13.017052341980222,
    "lng": 80.22780221474946,
    "status": "Assigned",
    "priority": "Medium",
    "department": "Drainage",
    "reportedAt": "2026-08-25T18:27:27.230Z",
    "updatedAt": "2026-08-25T20:22:57.958Z",
    "reportsCount": 3,
    "aiConfidence": 81,
    "assignee": "Team C",
    "slaHours": 72,
    "slaRemaining": "13h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-22-1",
        "title": "Report submitted",
        "timestamp": "2026-08-25T18:27:27.230Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-22-2",
        "title": "Assigned",
        "timestamp": "2026-08-25T20:22:57.958Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Parks team."
      }
    ]
  },
  {
    "id": "CIV-10423",
    "title": "Broken streetlight",
    "type": "Broken streetlight",
    "originalLanguage": "hi",
    "originalDescription": "????? ?? ??? ???? ?? ?? ???? ????? ???",
    "description": "This is a reported issue regarding broken streetlight. Open manhole posing severe danger to pedestrians.",
    "location": "Street 88, Delhi",
    "ward": "Ward 108",
    "city": "Delhi",
    "state": "Delhi",
    "authority": "Public Works Department",
    "lat": 13.07491423459277,
    "lng": 80.2274699989389,
    "status": "Assigned",
    "priority": "Medium",
    "department": "Parks",
    "reportedAt": "2026-08-01T19:25:05.228Z",
    "updatedAt": "2026-08-01T23:52:01.223Z",
    "reportsCount": 3,
    "aiConfidence": 96,
    "assignee": "Team I",
    "slaHours": 72,
    "slaRemaining": "-5h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-23-1",
        "title": "Report submitted",
        "timestamp": "2026-08-01T19:25:05.228Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-23-2",
        "title": "Assigned",
        "timestamp": "2026-08-01T23:52:01.223Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Sanitation team."
      }
    ]
  },
  {
    "id": "CIV-10424",
    "title": "Garbage accumulation",
    "type": "Garbage accumulation",
    "originalLanguage": "hi",
    "originalDescription": "?? ????? ?? ???? ???? ????? ??? ???",
    "description": "This is a reported issue regarding garbage accumulation. There is a large pothole near the bus stop.",
    "location": "Street 35, Jaipur",
    "ward": "Ward 17",
    "city": "Jaipur",
    "state": "Rajasthan",
    "authority": "Public Works Department",
    "lat": 13.061837683616321,
    "lng": 80.29611486441942,
    "status": "Closed",
    "priority": "Critical",
    "department": "Roads",
    "reportedAt": "2026-08-01T11:40:45.112Z",
    "updatedAt": "2026-08-03T13:01:15.889Z",
    "reportsCount": 2,
    "aiConfidence": 80,
    "assignee": "Team N",
    "slaHours": 48,
    "slaRemaining": "0h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-24-1",
        "title": "Report submitted",
        "timestamp": "2026-08-01T11:40:45.112Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-24-2",
        "title": "Assigned",
        "timestamp": "2026-08-01T17:03:45.613Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Parks team."
      },
      {
        "id": "tl-24-3",
        "title": "Work started",
        "timestamp": "2026-08-01T19:05:56.616Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      },
      {
        "id": "tl-24-4",
        "title": "Work completed",
        "timestamp": "2026-08-02T14:14:17.059Z",
        "status": "Resolved",
        "actor": "Field Team",
        "action": "Work completed",
        "description": "Physical work has been completed.",
        "notes": "Awaiting citizen verification."
      },
      {
        "id": "tl-24-5",
        "title": "Citizen verified",
        "timestamp": "2026-08-03T13:01:15.889Z",
        "status": "Closed",
        "actor": "Citizen",
        "action": "Resolution confirmed",
        "description": "Citizen confirmed the resolution.",
        "notes": "Issue permanently closed."
      }
    ]
  },
  {
    "id": "CIV-10425",
    "title": "Road debris",
    "type": "Road debris",
    "originalLanguage": "hi",
    "originalDescription": "?? ????? ?? ???? ???? ????? ??? ???",
    "description": "This is a reported issue regarding road debris. Open manhole posing severe danger to pedestrians.",
    "location": "Street 89, Pune",
    "ward": "Ward 121",
    "city": "Pune",
    "state": "Maharashtra",
    "authority": "Water Board",
    "lat": 13.036325995732264,
    "lng": 80.20243476232605,
    "status": "In Progress",
    "priority": "Low",
    "department": "Water",
    "reportedAt": "2026-08-18T11:47:49.622Z",
    "updatedAt": "2026-08-18T20:19:08.561Z",
    "reportsCount": 5,
    "aiConfidence": 87,
    "assignee": "Team O",
    "slaHours": 48,
    "slaRemaining": "26h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-25-1",
        "title": "Report submitted",
        "timestamp": "2026-08-18T11:47:49.622Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-25-2",
        "title": "Assigned",
        "timestamp": "2026-08-18T14:46:31.512Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Roads team."
      },
      {
        "id": "tl-25-3",
        "title": "Work started",
        "timestamp": "2026-08-18T20:19:08.561Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      }
    ]
  },
  {
    "id": "CIV-10426",
    "title": "Broken streetlight",
    "type": "Broken streetlight",
    "originalLanguage": "en",
    "originalDescription": "The streetlight is broken and the area is completely dark.",
    "description": "This is a reported issue regarding broken streetlight. Open manhole posing severe danger to pedestrians.",
    "location": "Street 28, Ahmedabad",
    "ward": "Ward 37",
    "city": "Ahmedabad",
    "state": "Gujarat",
    "authority": "Water Board",
    "lat": 13.09768132456765,
    "lng": 80.22321287483763,
    "status": "Assigned",
    "priority": "Low",
    "department": "Electrical",
    "reportedAt": "2026-08-09T10:19:20.054Z",
    "updatedAt": "2026-08-09T12:19:35.849Z",
    "reportsCount": 5,
    "aiConfidence": 83,
    "assignee": "Team W",
    "slaHours": 48,
    "slaRemaining": "14h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-26-1",
        "title": "Report submitted",
        "timestamp": "2026-08-09T10:19:20.054Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-26-2",
        "title": "Assigned",
        "timestamp": "2026-08-09T12:19:35.849Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Drainage team."
      }
    ]
  },
  {
    "id": "CIV-10427",
    "title": "Water leakage",
    "type": "Water leakage",
    "originalLanguage": "ta",
    "originalDescription": "????????? ?? ???????? ???????????????.",
    "description": "This is a reported issue regarding water leakage. The streetlight is broken and the area is completely dark.",
    "location": "Street 96, Kolkata",
    "ward": "Ward 61",
    "city": "Kolkata",
    "state": "West Bengal",
    "authority": "Municipal Corporation",
    "lat": 13.07922758045524,
    "lng": 80.27233816951988,
    "status": "Closed",
    "priority": "Low",
    "department": "Water",
    "reportedAt": "2026-08-18T16:33:51.662Z",
    "updatedAt": "2026-08-20T14:38:36.045Z",
    "reportsCount": 3,
    "aiConfidence": 92,
    "assignee": "Team D",
    "slaHours": 48,
    "slaRemaining": "0h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-27-1",
        "title": "Report submitted",
        "timestamp": "2026-08-18T16:33:51.662Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-27-2",
        "title": "Assigned",
        "timestamp": "2026-08-18T18:07:18.117Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Parks team."
      },
      {
        "id": "tl-27-3",
        "title": "Work started",
        "timestamp": "2026-08-19T00:05:29.650Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      },
      {
        "id": "tl-27-4",
        "title": "Work completed",
        "timestamp": "2026-08-20T09:51:39.912Z",
        "status": "Resolved",
        "actor": "Field Team",
        "action": "Work completed",
        "description": "Physical work has been completed.",
        "notes": "Awaiting citizen verification."
      },
      {
        "id": "tl-27-5",
        "title": "Citizen verified",
        "timestamp": "2026-08-20T14:38:36.045Z",
        "status": "Closed",
        "actor": "Citizen",
        "action": "Resolution confirmed",
        "description": "Citizen confirmed the resolution.",
        "notes": "Issue permanently closed."
      }
    ]
  },
  {
    "id": "CIV-10428",
    "title": "Open manhole",
    "type": "Open manhole",
    "originalLanguage": "en",
    "originalDescription": "Open manhole posing severe danger to pedestrians.",
    "description": "This is a reported issue regarding open manhole. Open manhole posing severe danger to pedestrians.",
    "location": "Street 1, Chennai",
    "ward": "Ward 115",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "authority": "Water Board",
    "lat": 13.090716714497074,
    "lng": 80.26865766022605,
    "status": "Closed",
    "priority": "Critical",
    "department": "Electrical",
    "reportedAt": "2026-08-09T11:24:23.705Z",
    "updatedAt": "2026-08-12T08:18:28.394Z",
    "reportsCount": 5,
    "aiConfidence": 87,
    "assignee": "Team B",
    "slaHours": 72,
    "slaRemaining": "0h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-28-1",
        "title": "Report submitted",
        "timestamp": "2026-08-09T11:24:23.705Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-28-2",
        "title": "Assigned",
        "timestamp": "2026-08-09T16:37:31.489Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Electrical team."
      },
      {
        "id": "tl-28-3",
        "title": "Work started",
        "timestamp": "2026-08-09T23:01:23.341Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      },
      {
        "id": "tl-28-4",
        "title": "Work completed",
        "timestamp": "2026-08-11T10:53:16.668Z",
        "status": "Resolved",
        "actor": "Field Team",
        "action": "Work completed",
        "description": "Physical work has been completed.",
        "notes": "Awaiting citizen verification."
      },
      {
        "id": "tl-28-5",
        "title": "Citizen verified",
        "timestamp": "2026-08-12T08:18:28.394Z",
        "status": "Closed",
        "actor": "Citizen",
        "action": "Resolution confirmed",
        "description": "Citizen confirmed the resolution.",
        "notes": "Issue permanently closed."
      }
    ]
  },
  {
    "id": "CIV-10429",
    "title": "Stray cattle",
    "type": "Stray cattle",
    "originalLanguage": "ta",
    "originalDescription": "??????? ???? ???????? ?????????????? ????????.",
    "description": "This is a reported issue regarding stray cattle. Open manhole posing severe danger to pedestrians.",
    "location": "Street 62, Pune",
    "ward": "Ward 66",
    "city": "Pune",
    "state": "Maharashtra",
    "authority": "Municipal Corporation",
    "lat": 13.02413658201961,
    "lng": 80.23211538062444,
    "status": "Assigned",
    "priority": "High",
    "department": "Roads",
    "reportedAt": "2026-08-11T18:05:41.757Z",
    "updatedAt": "2026-08-11T21:15:30.789Z",
    "reportsCount": 1,
    "aiConfidence": 99,
    "assignee": "Team E",
    "slaHours": 72,
    "slaRemaining": "22h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-29-1",
        "title": "Report submitted",
        "timestamp": "2026-08-11T18:05:41.757Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-29-2",
        "title": "Assigned",
        "timestamp": "2026-08-11T21:15:30.789Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Water team."
      }
    ]
  },
  {
    "id": "CIV-10430",
    "title": "Pothole",
    "type": "Pothole",
    "originalLanguage": "ta",
    "originalDescription": "???? ??????? ??????????, ???????? ??????.",
    "description": "This is a reported issue regarding pothole. Garbage has accumulated for days and is smelling bad.",
    "location": "Street 10, Pune",
    "ward": "Ward 131",
    "city": "Pune",
    "state": "Maharashtra",
    "authority": "Municipal Corporation",
    "lat": 13.048692771014727,
    "lng": 80.20629030911195,
    "status": "Closed",
    "priority": "Medium",
    "department": "Sanitation",
    "reportedAt": "2026-08-21T13:32:18.549Z",
    "updatedAt": "2026-08-23T11:00:13.458Z",
    "reportsCount": 1,
    "aiConfidence": 97,
    "assignee": "Team S",
    "slaHours": 72,
    "slaRemaining": "0h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-30-1",
        "title": "Report submitted",
        "timestamp": "2026-08-21T13:32:18.549Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-30-2",
        "title": "Assigned",
        "timestamp": "2026-08-21T16:04:54.257Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Roads team."
      },
      {
        "id": "tl-30-3",
        "title": "Work started",
        "timestamp": "2026-08-22T02:06:52.273Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      },
      {
        "id": "tl-30-4",
        "title": "Work completed",
        "timestamp": "2026-08-22T21:10:37.011Z",
        "status": "Resolved",
        "actor": "Field Team",
        "action": "Work completed",
        "description": "Physical work has been completed.",
        "notes": "Awaiting citizen verification."
      },
      {
        "id": "tl-30-5",
        "title": "Citizen verified",
        "timestamp": "2026-08-23T11:00:13.458Z",
        "status": "Closed",
        "actor": "Citizen",
        "action": "Resolution confirmed",
        "description": "Citizen confirmed the resolution.",
        "notes": "Issue permanently closed."
      }
    ]
  },
  {
    "id": "CIV-10431",
    "title": "Fallen tree",
    "type": "Fallen tree",
    "originalLanguage": "en",
    "originalDescription": "The streetlight is broken and the area is completely dark.",
    "description": "This is a reported issue regarding fallen tree. Open manhole posing severe danger to pedestrians.",
    "location": "Street 56, Jaipur",
    "ward": "Ward 41",
    "city": "Jaipur",
    "state": "Rajasthan",
    "authority": "Water Board",
    "lat": 13.089938596031365,
    "lng": 80.24357960721757,
    "status": "Reopened",
    "priority": "High",
    "department": "Drainage",
    "reportedAt": "2026-08-13T18:05:35.074Z",
    "updatedAt": "2026-08-15T13:31:56.738Z",
    "reportsCount": 4,
    "aiConfidence": 94,
    "assignee": "Team N",
    "slaHours": 48,
    "slaRemaining": "36h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-31-1",
        "title": "Report submitted",
        "timestamp": "2026-08-13T18:05:35.074Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-31-2",
        "title": "Assigned",
        "timestamp": "2026-08-13T20:40:01.772Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Sanitation team."
      },
      {
        "id": "tl-31-3",
        "title": "Work started",
        "timestamp": "2026-08-14T03:13:08.304Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      },
      {
        "id": "tl-31-4",
        "title": "Work completed",
        "timestamp": "2026-08-15T09:20:33.001Z",
        "status": "Resolved",
        "actor": "Field Team",
        "action": "Work completed",
        "description": "Physical work has been completed.",
        "notes": "Awaiting citizen verification."
      },
      {
        "id": "tl-31-6",
        "title": "Reopened by Citizen",
        "timestamp": "2026-08-15T13:31:56.738Z",
        "status": "Reopened",
        "actor": "Citizen",
        "action": "Reopened",
        "description": "Citizen rejected the resolution.",
        "notes": "Work was incomplete."
      }
    ]
  },
  {
    "id": "CIV-10432",
    "title": "Fallen tree",
    "type": "Fallen tree",
    "originalLanguage": "hi",
    "originalDescription": "?? ????? ?? ???? ???? ????? ??? ???",
    "description": "This is a reported issue regarding fallen tree. Open manhole posing severe danger to pedestrians.",
    "location": "Street 38, Delhi",
    "ward": "Ward 119",
    "city": "Delhi",
    "state": "Delhi",
    "authority": "Water Board",
    "lat": 13.051876960955008,
    "lng": 80.29000135400703,
    "status": "In Progress",
    "priority": "Medium",
    "department": "Electrical",
    "reportedAt": "2026-08-08T13:07:10.119Z",
    "updatedAt": "2026-08-09T03:58:24.884Z",
    "reportsCount": 5,
    "aiConfidence": 94,
    "assignee": "Team Z",
    "slaHours": 72,
    "slaRemaining": "31h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-32-1",
        "title": "Report submitted",
        "timestamp": "2026-08-08T13:07:10.119Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-32-2",
        "title": "Assigned",
        "timestamp": "2026-08-08T18:20:49.036Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Parks team."
      },
      {
        "id": "tl-32-3",
        "title": "Work started",
        "timestamp": "2026-08-09T03:58:24.884Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      }
    ]
  },
  {
    "id": "CIV-10433",
    "title": "Road flooding",
    "type": "Road flooding",
    "originalLanguage": "hi",
    "originalDescription": "???? ?? ???? ???? ?? ?? ??? ???",
    "description": "This is a reported issue regarding road flooding. There is a large pothole near the bus stop.",
    "location": "Street 40, Chennai",
    "ward": "Ward 12",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "authority": "Public Works Department",
    "lat": 13.034242485881263,
    "lng": 80.25121253123,
    "status": "Assigned",
    "priority": "Low",
    "department": "Drainage",
    "reportedAt": "2026-08-24T20:45:29.190Z",
    "updatedAt": "2026-08-25T01:24:29.923Z",
    "reportsCount": 5,
    "aiConfidence": 95,
    "assignee": "Team C",
    "slaHours": 24,
    "slaRemaining": "21h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-33-1",
        "title": "Report submitted",
        "timestamp": "2026-08-24T20:45:29.190Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-33-2",
        "title": "Assigned",
        "timestamp": "2026-08-25T01:24:29.923Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Water team."
      }
    ]
  },
  {
    "id": "CIV-10434",
    "title": "Damaged footpath",
    "type": "Damaged footpath",
    "originalLanguage": "en",
    "originalDescription": "Garbage has accumulated for days and is smelling bad.",
    "description": "This is a reported issue regarding damaged footpath. Garbage has accumulated for days and is smelling bad.",
    "location": "Street 75, Surat",
    "ward": "Ward 139",
    "city": "Surat",
    "state": "Gujarat",
    "authority": "Water Board",
    "lat": 13.03276461754709,
    "lng": 80.21980796494032,
    "status": "Closed",
    "priority": "High",
    "department": "Water",
    "reportedAt": "2026-08-10T16:59:22.343Z",
    "updatedAt": "2026-08-12T18:57:07.506Z",
    "reportsCount": 4,
    "aiConfidence": 97,
    "assignee": "Team A",
    "slaHours": 48,
    "slaRemaining": "0h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-34-1",
        "title": "Report submitted",
        "timestamp": "2026-08-10T16:59:22.343Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-34-2",
        "title": "Assigned",
        "timestamp": "2026-08-10T21:53:33.771Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Parks team."
      },
      {
        "id": "tl-34-3",
        "title": "Work started",
        "timestamp": "2026-08-11T01:42:43.366Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      },
      {
        "id": "tl-34-4",
        "title": "Work completed",
        "timestamp": "2026-08-11T21:40:13.330Z",
        "status": "Resolved",
        "actor": "Field Team",
        "action": "Work completed",
        "description": "Physical work has been completed.",
        "notes": "Awaiting citizen verification."
      },
      {
        "id": "tl-34-5",
        "title": "Citizen verified",
        "timestamp": "2026-08-12T18:57:07.506Z",
        "status": "Closed",
        "actor": "Citizen",
        "action": "Resolution confirmed",
        "description": "Citizen confirmed the resolution.",
        "notes": "Issue permanently closed."
      }
    ]
  },
  {
    "id": "CIV-10435",
    "title": "Open manhole",
    "type": "Open manhole",
    "originalLanguage": "en",
    "originalDescription": "There is a large pothole near the bus stop.",
    "description": "This is a reported issue regarding open manhole. There is a large pothole near the bus stop.",
    "location": "Street 53, Hyderabad",
    "ward": "Ward 97",
    "city": "Hyderabad",
    "state": "Telangana",
    "authority": "Public Works Department",
    "lat": 13.032643573608587,
    "lng": 80.20642342395354,
    "status": "In Progress",
    "priority": "High",
    "department": "Sanitation",
    "reportedAt": "2026-08-07T11:13:17.983Z",
    "updatedAt": "2026-08-07T18:02:36.978Z",
    "reportsCount": 4,
    "aiConfidence": 93,
    "assignee": "Team M",
    "slaHours": 48,
    "slaRemaining": "-2h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-35-1",
        "title": "Report submitted",
        "timestamp": "2026-08-07T11:13:17.983Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-35-2",
        "title": "Assigned",
        "timestamp": "2026-08-07T13:47:05.698Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Parks team."
      },
      {
        "id": "tl-35-3",
        "title": "Work started",
        "timestamp": "2026-08-07T18:02:36.978Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      }
    ]
  },
  {
    "id": "CIV-10436",
    "title": "Overflowing drain",
    "type": "Overflowing drain",
    "originalLanguage": "hi",
    "originalDescription": "??????? ???? ??? ???? ?? ??? ??, ???? ?????? ???",
    "description": "This is a reported issue regarding overflowing drain. There is a large pothole near the bus stop.",
    "location": "Street 58, Kolkata",
    "ward": "Ward 97",
    "city": "Kolkata",
    "state": "West Bengal",
    "authority": "Water Board",
    "lat": 13.068044839319606,
    "lng": 80.25563368788306,
    "status": "Closed",
    "priority": "Low",
    "department": "Drainage",
    "reportedAt": "2026-07-31T22:32:00.721Z",
    "updatedAt": "2026-08-02T13:42:15.746Z",
    "reportsCount": 2,
    "aiConfidence": 98,
    "assignee": "Team Q",
    "slaHours": 72,
    "slaRemaining": "0h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-36-1",
        "title": "Report submitted",
        "timestamp": "2026-07-31T22:32:00.721Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-36-2",
        "title": "Assigned",
        "timestamp": "2026-08-01T03:25:00.873Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Water team."
      },
      {
        "id": "tl-36-3",
        "title": "Work started",
        "timestamp": "2026-08-01T10:32:54.285Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      },
      {
        "id": "tl-36-4",
        "title": "Work completed",
        "timestamp": "2026-08-02T07:57:08.965Z",
        "status": "Resolved",
        "actor": "Field Team",
        "action": "Work completed",
        "description": "Physical work has been completed.",
        "notes": "Awaiting citizen verification."
      },
      {
        "id": "tl-36-5",
        "title": "Citizen verified",
        "timestamp": "2026-08-02T13:42:15.746Z",
        "status": "Closed",
        "actor": "Citizen",
        "action": "Resolution confirmed",
        "description": "Citizen confirmed the resolution.",
        "notes": "Issue permanently closed."
      }
    ]
  },
  {
    "id": "CIV-10437",
    "title": "Pothole",
    "type": "Pothole",
    "originalLanguage": "en",
    "originalDescription": "The streetlight is broken and the area is completely dark.",
    "description": "This is a reported issue regarding pothole. Open manhole posing severe danger to pedestrians.",
    "location": "Street 31, Chennai",
    "ward": "Ward 51",
    "city": "Chennai",
    "state": "Tamil Nadu",
    "authority": "Municipal Corporation",
    "lat": 13.036979224174651,
    "lng": 80.24646520646269,
    "status": "Resolved",
    "priority": "Low",
    "department": "Parks",
    "reportedAt": "2026-08-17T08:34:09.096Z",
    "updatedAt": "2026-08-18T21:33:28.494Z",
    "reportsCount": 3,
    "aiConfidence": 98,
    "assignee": "Team P",
    "slaHours": 24,
    "slaRemaining": "0h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-37-1",
        "title": "Report submitted",
        "timestamp": "2026-08-17T08:34:09.096Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-37-2",
        "title": "Assigned",
        "timestamp": "2026-08-17T12:19:05.412Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Electrical team."
      },
      {
        "id": "tl-37-3",
        "title": "Work started",
        "timestamp": "2026-08-17T18:31:09.345Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      },
      {
        "id": "tl-37-4",
        "title": "Work completed",
        "timestamp": "2026-08-18T21:33:28.494Z",
        "status": "Resolved",
        "actor": "Field Team",
        "action": "Work completed",
        "description": "Physical work has been completed.",
        "notes": "Awaiting citizen verification."
      }
    ]
  },
  {
    "id": "CIV-10438",
    "title": "Water leakage",
    "type": "Water leakage",
    "originalLanguage": "en",
    "originalDescription": "There is a large pothole near the bus stop.",
    "description": "This is a reported issue regarding water leakage. There is a large pothole near the bus stop.",
    "location": "Street 5, Ahmedabad",
    "ward": "Ward 135",
    "city": "Ahmedabad",
    "state": "Gujarat",
    "authority": "Municipal Corporation",
    "lat": 13.060463587688542,
    "lng": 80.23654148436937,
    "status": "Resolved",
    "priority": "Low",
    "department": "Sanitation",
    "reportedAt": "2026-08-16T06:52:50.418Z",
    "updatedAt": "2026-08-17T14:13:32.634Z",
    "reportsCount": 4,
    "aiConfidence": 80,
    "assignee": "Team M",
    "slaHours": 48,
    "slaRemaining": "0h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-38-1",
        "title": "Report submitted",
        "timestamp": "2026-08-16T06:52:50.418Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-38-2",
        "title": "Assigned",
        "timestamp": "2026-08-16T12:34:29.111Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Sanitation team."
      },
      {
        "id": "tl-38-3",
        "title": "Work started",
        "timestamp": "2026-08-16T22:00:37.141Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      },
      {
        "id": "tl-38-4",
        "title": "Work completed",
        "timestamp": "2026-08-17T14:13:32.634Z",
        "status": "Resolved",
        "actor": "Field Team",
        "action": "Work completed",
        "description": "Physical work has been completed.",
        "notes": "Awaiting citizen verification."
      }
    ]
  },
  {
    "id": "CIV-10439",
    "title": "Water leakage",
    "type": "Water leakage",
    "originalLanguage": "ta",
    "originalDescription": "??????? ???? ???????? ?????????????? ????????.",
    "description": "This is a reported issue regarding water leakage. Open manhole posing severe danger to pedestrians.",
    "location": "Street 59, Bengaluru",
    "ward": "Ward 134",
    "city": "Bengaluru",
    "state": "Karnataka",
    "authority": "Municipal Corporation",
    "lat": 13.060142451250416,
    "lng": 80.2545540342147,
    "status": "Assigned",
    "priority": "Low",
    "department": "Electrical",
    "reportedAt": "2026-08-22T14:56:37.241Z",
    "updatedAt": "2026-08-22T19:24:38.733Z",
    "reportsCount": 5,
    "aiConfidence": 80,
    "assignee": "Team U",
    "slaHours": 72,
    "slaRemaining": "-3h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-39-1",
        "title": "Report submitted",
        "timestamp": "2026-08-22T14:56:37.241Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-39-2",
        "title": "Assigned",
        "timestamp": "2026-08-22T19:24:38.733Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Drainage team."
      }
    ]
  },
  {
    "id": "CIV-10440",
    "title": "Damaged footpath",
    "type": "Damaged footpath",
    "originalLanguage": "en",
    "originalDescription": "There is a large pothole near the bus stop.",
    "description": "This is a reported issue regarding damaged footpath. Open manhole posing severe danger to pedestrians.",
    "location": "Street 45, Kolkata",
    "ward": "Ward 61",
    "city": "Kolkata",
    "state": "West Bengal",
    "authority": "Public Works Department",
    "lat": 13.015235374347116,
    "lng": 80.2322948686462,
    "status": "Submitted",
    "priority": "Critical",
    "department": "Roads",
    "reportedAt": "2026-08-17T05:59:09.052Z",
    "updatedAt": "2026-08-17T05:59:09.052Z",
    "reportsCount": 2,
    "aiConfidence": 94,
    "assignee": "Team A",
    "slaHours": 48,
    "slaRemaining": "12h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-40-1",
        "title": "Report submitted",
        "timestamp": "2026-08-17T05:59:09.052Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      }
    ]
  },
  {
    "id": "CIV-10441",
    "title": "Broken streetlight",
    "type": "Broken streetlight",
    "originalLanguage": "en",
    "originalDescription": "There is a large pothole near the bus stop.",
    "description": "This is a reported issue regarding broken streetlight. There is a large pothole near the bus stop.",
    "location": "Street 99, Surat",
    "ward": "Ward 77",
    "city": "Surat",
    "state": "Gujarat",
    "authority": "Municipal Corporation",
    "lat": 13.000096005949205,
    "lng": 80.20557273764133,
    "status": "Resolved",
    "priority": "Low",
    "department": "Sanitation",
    "reportedAt": "2026-08-24T00:01:03.323Z",
    "updatedAt": "2026-08-24T14:50:31.413Z",
    "reportsCount": 5,
    "aiConfidence": 81,
    "assignee": "Team D",
    "slaHours": 48,
    "slaRemaining": "0h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-41-1",
        "title": "Report submitted",
        "timestamp": "2026-08-24T00:01:03.323Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-41-2",
        "title": "Assigned",
        "timestamp": "2026-08-24T03:19:36.011Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Electrical team."
      },
      {
        "id": "tl-41-3",
        "title": "Work started",
        "timestamp": "2026-08-24T10:01:42.356Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      },
      {
        "id": "tl-41-4",
        "title": "Work completed",
        "timestamp": "2026-08-24T14:50:31.413Z",
        "status": "Resolved",
        "actor": "Field Team",
        "action": "Work completed",
        "description": "Physical work has been completed.",
        "notes": "Awaiting citizen verification."
      }
    ]
  },
  {
    "id": "CIV-10442",
    "title": "Road flooding",
    "type": "Road flooding",
    "originalLanguage": "hi",
    "originalDescription": "?? ????? ?? ???? ???? ????? ??? ???",
    "description": "This is a reported issue regarding road flooding. The streetlight is broken and the area is completely dark.",
    "location": "Street 24, Jaipur",
    "ward": "Ward 5",
    "city": "Jaipur",
    "state": "Rajasthan",
    "authority": "Municipal Corporation",
    "lat": 13.089876030951382,
    "lng": 80.22144518877111,
    "status": "Closed",
    "priority": "Critical",
    "department": "Electrical",
    "reportedAt": "2026-08-21T06:18:11.413Z",
    "updatedAt": "2026-08-23T17:20:11.598Z",
    "reportsCount": 3,
    "aiConfidence": 84,
    "assignee": "Team Z",
    "slaHours": 24,
    "slaRemaining": "0h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-42-1",
        "title": "Report submitted",
        "timestamp": "2026-08-21T06:18:11.413Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-42-2",
        "title": "Assigned",
        "timestamp": "2026-08-21T08:51:07.337Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Parks team."
      },
      {
        "id": "tl-42-3",
        "title": "Work started",
        "timestamp": "2026-08-21T12:36:59.198Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      },
      {
        "id": "tl-42-4",
        "title": "Work completed",
        "timestamp": "2026-08-23T08:08:52.666Z",
        "status": "Resolved",
        "actor": "Field Team",
        "action": "Work completed",
        "description": "Physical work has been completed.",
        "notes": "Awaiting citizen verification."
      },
      {
        "id": "tl-42-5",
        "title": "Citizen verified",
        "timestamp": "2026-08-23T17:20:11.598Z",
        "status": "Closed",
        "actor": "Citizen",
        "action": "Resolution confirmed",
        "description": "Citizen confirmed the resolution.",
        "notes": "Issue permanently closed."
      }
    ]
  },
  {
    "id": "CIV-10443",
    "title": "Traffic signal damage",
    "type": "Traffic signal damage",
    "originalLanguage": "en",
    "originalDescription": "There is a large pothole near the bus stop.",
    "description": "This is a reported issue regarding traffic signal damage. There is a large pothole near the bus stop.",
    "location": "Street 86, Kolkata",
    "ward": "Ward 56",
    "city": "Kolkata",
    "state": "West Bengal",
    "authority": "Water Board",
    "lat": 13.06485868972814,
    "lng": 80.25802204349058,
    "status": "Submitted",
    "priority": "Low",
    "department": "Parks",
    "reportedAt": "2026-08-18T12:01:45.458Z",
    "updatedAt": "2026-08-18T12:01:45.458Z",
    "reportsCount": 2,
    "aiConfidence": 85,
    "assignee": "Team D",
    "slaHours": 48,
    "slaRemaining": "37h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-43-1",
        "title": "Report submitted",
        "timestamp": "2026-08-18T12:01:45.458Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      }
    ]
  },
  {
    "id": "CIV-10444",
    "title": "Garbage accumulation",
    "type": "Garbage accumulation",
    "originalLanguage": "hi",
    "originalDescription": "?? ????? ?? ???? ???? ????? ??? ???",
    "description": "This is a reported issue regarding garbage accumulation. Open manhole posing severe danger to pedestrians.",
    "location": "Street 40, Surat",
    "ward": "Ward 147",
    "city": "Surat",
    "state": "Gujarat",
    "authority": "Municipal Corporation",
    "lat": 13.072359884403673,
    "lng": 80.20899185994318,
    "status": "In Progress",
    "priority": "Low",
    "department": "Drainage",
    "reportedAt": "2026-08-06T12:18:49.724Z",
    "updatedAt": "2026-08-06T16:56:04.167Z",
    "reportsCount": 2,
    "aiConfidence": 84,
    "assignee": "Team D",
    "slaHours": 48,
    "slaRemaining": "-6h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-44-1",
        "title": "Report submitted",
        "timestamp": "2026-08-06T12:18:49.724Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-44-2",
        "title": "Assigned",
        "timestamp": "2026-08-06T14:03:45.880Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Water team."
      },
      {
        "id": "tl-44-3",
        "title": "Work started",
        "timestamp": "2026-08-06T16:56:04.167Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      }
    ]
  },
  {
    "id": "CIV-10445",
    "title": "Open manhole",
    "type": "Open manhole",
    "originalLanguage": "hi",
    "originalDescription": "??????? ???? ??? ???? ?? ??? ??, ???? ?????? ???",
    "description": "This is a reported issue regarding open manhole. The streetlight is broken and the area is completely dark.",
    "location": "Street 53, Ahmedabad",
    "ward": "Ward 57",
    "city": "Ahmedabad",
    "state": "Gujarat",
    "authority": "Public Works Department",
    "lat": 13.067616125870737,
    "lng": 80.21205532257586,
    "status": "Resolved",
    "priority": "Low",
    "department": "Parks",
    "reportedAt": "2026-08-16T13:26:36.605Z",
    "updatedAt": "2026-08-17T02:06:33.237Z",
    "reportsCount": 3,
    "aiConfidence": 95,
    "assignee": "Team J",
    "slaHours": 72,
    "slaRemaining": "0h",
    "images": {
      "before": "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400"
    },
    "timeline": [
      {
        "id": "tl-45-1",
        "title": "Report submitted",
        "timestamp": "2026-08-16T13:26:36.605Z",
        "status": "Submitted",
        "actor": "Citizen",
        "action": "Report submitted",
        "description": "Report received by the system.",
        "notes": "System auto-acknowledged."
      },
      {
        "id": "tl-45-2",
        "title": "Assigned",
        "timestamp": "2026-08-16T15:07:29.651Z",
        "status": "Assigned",
        "actor": "Officer",
        "action": "Assigned",
        "description": "Issue assigned to department.",
        "notes": "Assigned to Parks team."
      },
      {
        "id": "tl-45-3",
        "title": "Work started",
        "timestamp": "2026-08-16T21:20:44.721Z",
        "status": "In Progress",
        "actor": "Field Team",
        "action": "Work started",
        "description": "Team has arrived and started work.",
        "notes": "Materials deployed."
      },
      {
        "id": "tl-45-4",
        "title": "Work completed",
        "timestamp": "2026-08-17T02:06:33.237Z",
        "status": "Resolved",
        "actor": "Field Team",
        "action": "Work completed",
        "description": "Physical work has been completed.",
        "notes": "Awaiting citizen verification."
      }
    ]
  }
];
