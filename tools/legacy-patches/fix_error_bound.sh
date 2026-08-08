sed -i '33,45c\
  constructor(props: { children: ReactNode }) {\
    super(props)\
    this.props = props\
    this.state = { hasError: false }\
  }' src/features/activities/activityShared.tsx
