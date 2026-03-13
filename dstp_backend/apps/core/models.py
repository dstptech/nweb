 # These models store everything about a visitor — even before they register.
# Two tables:
#   1. VisitorSession  -> who is visiting (one record per unique visitor)
#   2. PageVisit       -> what pages they visited (many records per visitor