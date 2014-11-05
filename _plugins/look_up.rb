def look_up(context, name)
  lookup = context

  name.split(".").each do |value|
    lookup = lookup[value]
  end

  lookup
end