class PortfolioImageTag < Liquid::Tag
    def initialize(tag_name, markup, tokens)
        @markup = markup
        super
    end
    def render context
        output = super
        site = context.registers[:site]
        if @markup =~ /([\w]+(\.[\w]+)*)/i
            @myvalue = look_up(context, $1)
            @myvalue = to_slug(@myvalue)
        end

        asset = site.asset_path "portfolio/#{@myvalue}/#{@myvalue}--banner.jpg"

        "#{asset}"
    end
end


Liquid::Template.register_tag "portfolio_img", PortfolioImageTag